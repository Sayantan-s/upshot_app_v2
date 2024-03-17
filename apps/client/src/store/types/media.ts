// Single Image

export interface ISingleImageUploadResponse {
  rawImageUrl: string;
  croppedImageUrl: string;
}

interface MediaCropConfigCoords {
  x: number;
  y: number;
}

interface MediaCropMetaData {
  crop?: MediaCropConfigCoords;
  zoom?: number;
  rotate?: number;
}

interface MediaCropArea {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

interface IMediaPayloadConfig {
  metadata?: MediaCropMetaData;
  area?: MediaCropArea;
}
export interface IMediaPayload {
  raw: string;
  current: string;
  config: IMediaPayloadConfig;
}
