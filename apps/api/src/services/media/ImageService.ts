import { randomUUID } from "crypto";
import multer from "multer";
import { unlink } from "node:fs/promises";
import sharp from "sharp";
import { ICropInput } from "./type";

export class ImageService {
  private static storage = multer.diskStorage({
    filename: (_, file, cb) => cb(null, file.originalname),
  });

  private static multerStorageService = multer({
    storage: ImageService.storage,
  });

  static get uploadSingle() {
    return ImageService.multerStorageService.single("file");
  }

  static async crop({ file, config, metaData }: ICropInput) {
    const cropInfo = {
      left: config.crop.x,
      top: config.crop.y,
      width: metaData.width,
      height: metaData.height,
    };

    const image = sharp(file.path);
    let imageMetaData = await image.metadata();

    if (config.rotate) {
      await image.rotate(config.rotate);
      imageMetaData = await sharp(await image.toBuffer()).metadata();
    }

    cropInfo.top = Math.round((cropInfo.top / 100) * imageMetaData.height!);
    cropInfo.left = Math.round((cropInfo.left / 100) * imageMetaData.width!);
    cropInfo.width = Math.round((cropInfo.width / 100) * imageMetaData.width!);
    cropInfo.height = Math.round(
      (cropInfo.height / 100) * imageMetaData.height!
    );

    const uniqueCropImageId = randomUUID();
    const croppedImagePath = `temp/images/${uniqueCropImageId}.webp`;

    const result = await image.extract(cropInfo).jpeg().toBuffer();

    return {
      filePath: croppedImagePath,
      destroy: async () => await unlink(croppedImagePath),
    };
  }
}
