import H from '@api/helpers/ResponseHelper';
import { Cloudinary } from '@api/integrations/cloudinary';
import ErrorHandler from '@api/middlewares/error';
import { MediaService } from '@api/services/media';
import { ICropArea, ICropState } from '@api/services/media/type';
import { ISingleImageRequestHandler } from './type';

export class MediaController {
  public static singleImage: ISingleImageRequestHandler = async (req, res) => {
    const file = req.file;
    if (!file) throw new ErrorHandler(400, 'File not found!');
    const { type, config, cropMetaData } = req.body;

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
      // Cloudinary.client.uploader.upload(image.filePath, {
      //   folder: `${type}/cropped`,
      // }),
    ]);
    // const [rawImage, croppedImage] = await uploadCloudinaryImages;

    const [rawImage] = await uploadCloudinaryImages;
    // await image.destroy();

    H.success(res, {
      statusCode: 200,
      data: {
        rawImageUrl: rawImage.secure_url,
        // croppedImageUrl: croppedImage.secure_url,
      },
    });
  };
}
