import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_SECRET_KEY,
} from '@api/config';
import cloudinary from 'cloudinary';

export class Cloudinary {
  private static clientInstance: typeof cloudinary.v2 | null;
  constructor() {
    cloudinary.v2.config({
      secure: true,
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_SECRET_KEY,
    });
  }
  static get client() {
    if (!Cloudinary.clientInstance) {
      new Cloudinary();
      Cloudinary.clientInstance = cloudinary.v2;
    }
    return Cloudinary.clientInstance;
  }
}
