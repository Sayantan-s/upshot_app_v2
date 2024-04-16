import { ShotStatus } from '@prisma/client';
import { z } from 'zod';

export const ScheduleAllRegistrationHandlerSchema = z.array(
  z.object({
    id: z.string(),
    launchedAt: z
      .number({ required_error: 'Unable to schedule, launch time not added!' })
      .int(),
    status: z
      .string()
      .refine(
        (x) => x === ShotStatus.IDLE,
        'Unable to schedule, status is not idle!'
      ),
  })
);
