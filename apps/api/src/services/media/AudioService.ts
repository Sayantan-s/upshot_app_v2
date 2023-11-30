import multer from "multer";

export class AudioService {
  private static storage = multer.diskStorage({
    filename: (_, file, cb) => cb(null, file.originalname),
  });

  private static multerStorageService = multer({
    storage: AudioService.storage,
  });

  static get uploadSingle() {
    return AudioService.multerStorageService.single("file");
  }
}
