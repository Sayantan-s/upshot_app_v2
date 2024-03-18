import { randomUUID } from 'crypto';
import Jimp from 'jimp';
import multer from 'multer';
import { unlink } from 'node:fs/promises';
import { ICropInput } from './type';

export class ImageService {
  private static storage = multer.diskStorage({
    filename: (_, file, cb) => cb(null, file.originalname),
  });

  private static multerStorageService = multer({
    storage: ImageService.storage,
  });

  static get uploadSingle() {
    return ImageService.multerStorageService.single('file');
  }

  static async crop({ file, config, metaData }: ICropInput) {
    const cropInfo = {
      left: metaData.x,
      top: metaData.y,
      width: metaData.width,
      height: metaData.height,
    };
    const type = file.mimetype.split('/')[1];

    const image = await Jimp.read(file.path);
    image.crop(cropInfo.left, cropInfo.top, cropInfo.width, cropInfo.height);
    image.rotate(-config.rotate);

    const uniqueCropImageId = randomUUID();
    const croppedImagePath = `temp/images/${uniqueCropImageId}.${type}`;
    image.write(croppedImagePath);

    return {
      filePath: croppedImagePath,
      destroy: async () => await unlink(croppedImagePath),
    };
  }
}
