import { API_KEY } from '@api/config';
import { CacheKey } from '@api/enums/cache';
import { MESSAGE_SHOOT_SCHEDULED_SHOT } from '@api/enums/pubsub';
import H from '@api/helpers/ResponseHelper';
import ShotQueue from '@api/integrations/queues/shot/queue';
import { Redis } from '@api/integrations/redis';
import ErrorHandler from '@api/middlewares/error';
import { AuthService } from '@api/services/auth';
import { ProductService } from '@api/services/product';
import { ShotService } from '@api/services/shot';
import { Shot, ShotStatus } from '@prisma/client';
import { Client } from '@upstash/qstash';
import { differenceInSeconds, format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  INewShotAddHandler,
  IShotsFetchHandler,
  IShotsScheduleExecuterHandler,
  IShotsScheduleRegistrationHandler,
} from './type';

const client = new Client({
  token:
    'eyJVc2VySUQiOiJmMDhiYjY0OC05YTQwLTRiY2YtYTRhYS05OGVhYmQyMjE5MzQiLCJQYXNzd29yZCI6ImFjMTk5MjQzOTkyYTQ2NzRhYjIzMGNmZThkNjY2NzYxIn0=',
});
export class ShotController {
  public static fetchTargetProductPosts: IShotsFetchHandler = async (
    req,
    res
  ) => {
    const { productId } = req.query;
    const shotCreationStatus = await Redis.client.cache.get(productId);
    const areShotsSuccessfullyCreated = shotCreationStatus === null;
    if (areShotsSuccessfullyCreated) {
      const product = await ProductService.fetch({ id: productId }, undefined, {
        shots: true,
      });
      return H.success(res, {
        statusCode: 200,
        data: product.shots,
      });
    }
    return H.success(res, {
      statusCode: 200,
      data: { status: shotCreationStatus },
    });
  };

  public static shotScheduleRegistrationHandler: IShotsScheduleRegistrationHandler =
    async (req, res) => {
      const { shotId } = req.params;

      // Task 1:: Get Shot's data
      const cacheKey = `${CacheKey.SHOT_UPDATE}_${shotId}`;
      let shotData: string | Shot = await Redis.client.cache.get(cacheKey);
      if (shotData !== null) shotData = JSON.parse(shotData) as Shot;
      else shotData = await ShotService.fetch({ id: shotId });

      // Task 2:: Setup JWT expiry
      const currentDate = new Date();
      const UTCDate = new Date(shotData.launchedAt * 1000);
      const calculateDifferenceInSecs = differenceInSeconds(
        UTCDate,
        currentDate
      );
      if (calculateDifferenceInSecs < 1)
        throw new ErrorHandler(409, 'Cannot schedule shot for past date!');
      const JWT_EXPIRY = `${calculateDifferenceInSecs}s`;

      // Task 3:: Setup credentials for scheduling
      const scheduleReference = uuid();
      const access_token = AuthService.jwt.signAccessToken({
        payload: { id: req.session.user_id },
        expiresIn: JWT_EXPIRY,
      });
      const body = JSON.stringify({
        shotId,
        scheduleReference,
      });
      const headers = {
        'x-api-key': API_KEY,
        Authorization: `Bearer ${access_token}`,
      };

      // Task 4:: Setup Cron Time
      const minute = format(UTCDate, 'm');
      const hour = format(UTCDate, 'H');
      const dayOfMonth = format(UTCDate, 'd');
      const month = format(UTCDate, 'M');
      const cronTime = `${minute} ${hour} ${dayOfMonth} ${month} *`;

      // Task 5:: Create a schedule
      const _SERVER_URL = 'https://2807-119-82-104-98.ngrok-free.app';
      const { scheduleId } = await client.schedules.create({
        destination: `${_SERVER_URL}/api/v1/shot/schedule/webhook`,
        cron: cronTime,
        body,
        headers,
      });

      // Task 6:: Update shot to SCHEDULED
      await ShotService.update(
        { id: shotId },
        {
          status: ShotStatus.SCHEDULED,
        }
      );

      // Task 7:: Set shot schedule id to cache for executor's reference
      await Redis.client.cache.set(scheduleReference, scheduleId);

      return H.success(res, {
        statusCode: 200,
        data: 'Success',
      });
    };

  public static shotScheduleExecutor: IShotsScheduleExecuterHandler = async (
    req,
    res
  ) => {
    const { scheduleReference, shotId } = req.body;
    const scheduleId = await Redis.client.cache.get(scheduleReference);
    await client.schedules.delete(scheduleId);
    const targetShot = await ShotService.update(
      { id: shotId },
      {
        status: ShotStatus.SHOOT,
      }
    );
    await ShotQueue.client.produce(MESSAGE_SHOOT_SCHEDULED_SHOT, targetShot);
    await Redis.client.cache.del(scheduleReference);
    return H.success(res, {
      statusCode: 200,
      data: 'Success',
    });
  };
  public static addNewShot: INewShotAddHandler = async (req, res) => {
    // Save to DB
    // Shots should be added upto a certain limit
    const { productId } = req.params;
    if (!productId) throw new ErrorHandler(400, 'No Product Id found!');
    // const product = await ProductService.fetch({ id: productId }, undefined, {
    //   shots: true,
    // });
    const shotId = uuid();
    const shot = await ShotService.create({
      id: shotId,
      title: '',
      content: '',
      productType: 'IDLE',
      status: 'IDLE',
      product: {
        create: undefined,
        connectOrCreate: {
          where: undefined,
          create: undefined,
        },
        connect: undefined,
      },
    });
    return H.success(res, {
      statusCode: 200,
      data: { shot },
    });
  };
}
