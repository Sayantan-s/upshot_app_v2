import { AudioService } from "./AudioService";
import { ImageService } from "./ImageService";
import { VideoService } from "./VideoService";

export class MediaService {
  static image = ImageService;
  static video = VideoService;
  static audio = AudioService;
}
