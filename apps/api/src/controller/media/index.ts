import { MESSAGE_MEDIA } from '@api/enums/pubsub';
import H from '@api/helpers/ResponseHelper';
import { Cloudinary } from '@api/integrations/cloudinary';
import MediaQueue from '@api/integrations/queues/media/queue';
import ErrorHandler from '@api/middlewares/error';
import { MediaService } from '@api/services/media';
import { ICropArea, ICropState } from '@api/services/media/type';
import { ISingleImageRequestHandler } from './type';

export class MediaController {
  public static singleImage: ISingleImageRequestHandler = async (req, res) => {
    const file = req.file;
    if (!file) throw new ErrorHandler(400, 'File not found!');
    const { type, config, cropMetaData, intent, name } = req.body;

    // 683 KB = 683000 bytes
    const cropConfig: ICropState = JSON.parse(config);
    const cropMetaDataValues: ICropArea = JSON.parse(cropMetaData);
    const image = await MediaService.image.crop({
      file,
      config: cropConfig,
      metaData: cropMetaDataValues,
    });

    const uploadCloudinaryImages = Promise.all([
      Cloudinary.client.uploader.upload(file.path, {
        folder: `${type}/raw`,
      }),
      Cloudinary.client.uploader.upload(image.filePath, {
        folder: `${type}/cropped`,
      }),
    ]);

    const [rawImage, croppedImage] = await uploadCloudinaryImages;

    await image.destroy();

    const [collection, entity] = intent.split('_');

    await MediaQueue.client.produce(MESSAGE_MEDIA, {
      collection: collection,
      entity,
      mediaKeyName: name,
      raw: rawImage.secure_url,
      current: croppedImage.secure_url,
      config: {
        fileName: rawImage.original_filename,
        metadata: cropConfig,
        area: cropMetaDataValues,
      },
    });

    H.success(res, {
      statusCode: 200,
      data: {
        rawImageUrl: rawImage.secure_url,
        croppedImageUrl: croppedImage.secure_url,
      },
    });
  };
}
