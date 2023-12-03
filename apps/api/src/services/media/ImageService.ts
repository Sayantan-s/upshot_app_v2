import multer from 'multer';
import { ICropInput } from './type';
import Jimp from 'jimp'
import { randomUUID } from 'crypto';
import { unlink } from 'node:fs/promises';

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
      left: config.crop.x,
      top: config.crop.y,
      width: metaData.width,
      height: metaData.height,
    };
    console.log("ay1   ",file);
    const [_,type] = file.mimetype.split("/")
    cropInfo.top = Math.round((cropInfo.top / 100) * metaData.height!);
    cropInfo.left = Math.round((cropInfo.left / 100) * metaData.width!);
    cropInfo.width = Math.round((cropInfo.width / 100) * metaData.width!);
    cropInfo.height = Math.round(
      (cropInfo.height / 100) * metaData.height!
    );
    const image = (await Jimp.read(file.path))
    .crop(cropInfo.left,cropInfo.top,cropInfo.width,cropInfo.height)
    console.log("ay2");

    //image.rotate(config.rotate)
    const uniqueCropImageId = randomUUID();
    const croppedImagePath = `temp/images/${uniqueCropImageId}.${type}`;
    image.write(croppedImagePath)
    console.log("ay3");
    // const image = sharp(file.path);
    // let imageMetaData = await image.metadata();

    // if (config.rotate) {
    //   await image.rotate(config.rotate);
    //   imageMetaData = await sharp(await image.toBuffer()).metadata();
    // }

    // cropInfo.top = Math.round((cropInfo.top / 100) * imageMetaData.height!);
    // cropInfo.left = Math.round((cropInfo.left / 100) * imageMetaData.width!);
    // cropInfo.width = Math.round((cropInfo.width / 100) * imageMetaData.width!);
    // cropInfo.height = Math.round(
    //   (cropInfo.height / 100) * imageMetaData.height!
    // );

    // const uniqueCropImageId = randomUUID();
    // const croppedImagePath = `temp/images/${uniqueCropImageId}.webp`;

    // await image.extract(cropInfo).jpeg().toBuffer();

    return {
      filePath: croppedImagePath,
      destroy: async () => await unlink(croppedImagePath),
    };
  }
}
