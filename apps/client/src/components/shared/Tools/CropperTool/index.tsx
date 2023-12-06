import { Close } from '@client/components/icons';
import { Button } from '@client/components/ui';
import { Modal } from '@client/components/ui/Modal';
import RangeSlider from '@client/components/ui/Slider';
import { mediaApi } from '@client/store/services/media';
import { Crop } from 'iconsax-react';
import { FC, PropsWithChildren, useReducer, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { ICropperReducerFunc, Props } from './types';

const initialState = {
  crop: { x: 0, y: 0 },
  zoom: 1,
  rotate: 0,
};

const aspectRatioValues = {
  video: 16 / 9,
  square: 1 / 1,
};

export const CropperTool: FC<PropsWithChildren<Props>> = ({
  children,
  imageMetaData,
  cropConfiguration,
  cropShape,
  objectFit,
  aspectRatio = 'video',
  title,
  imageSuggestions,
  showGrid = true,
  name,
  onUploadComplete,
  ...rest
}) => {
  const [uploadImage, { isLoading: isUploading }] =
    mediaApi.useUploadSingleImageMutation();

  const [config, dispatch] = useReducer<ICropperReducerFunc>(
    (state, { type, payload }) => {
      switch (type) {
        case 'CROP':
          return { ...state, crop: payload };
        case 'ZOOM':
          return { ...state, zoom: payload };
        case 'ROTATE':
          return { ...state, rotate: payload };
        default:
          return state;
      }
    },
    cropConfiguration || initialState
  );

  const [areaPixel, setAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const handleCropComplete = (_: Area, croppedAreaPixels: Area) =>
    setAreaPixels(croppedAreaPixels);

  const handleCropChange = (location: Point) =>
    dispatch({ type: 'CROP', payload: location });

  const handleZoomChange = (zoom: number) =>
    dispatch({ type: 'ZOOM', payload: zoom });

  const handleRotationChange = (rotation: number) =>
    dispatch({ type: 'ROTATE', payload: rotation });

  const handleUpload = async () => {
    if (!imageMetaData.file) return;
    const formData = new FormData();
    formData.append('type', name);
    formData.append('config', JSON.stringify(config));
    formData.append('cropMetaData', JSON.stringify(areaPixel));
    formData.append('file', imageMetaData.file);
    const { data } = await uploadImage(formData).unwrap();
    onUploadComplete?.(data);
    setTimeout(() => rest.onHide?.(), 0);
  };

  return (
    <Modal {...rest} freeze={isUploading}>
      <div className="bg-white w-[390px] flex flex-col justify-between shadow-md shadow-slate-600/5 rounded-xl py-5">
        <div className="flex items-center px-5 mb-5 space-x-3">
          <div className="w-14 flex items-center justify-center shadow shadow-slate-900/10 rounded-lg bg-white aspect-square border">
            <Crop size="24" color="rgb(15,23,42)" />
          </div>
          <div>
            <p className="text-base text-slate-900 font-[700]">{title}</p>
            <p>{imageSuggestions}</p>
          </div>
          <button className="hover:group" onClick={rest.onHide}>
            <Close
              size={16}
              className="stroke-slate-300 group-hover:stroke-rose-400: absolute top-3 right-3"
            />
          </button>
        </div>
        <div className="w-full h-[280px] relative">
          <Cropper
            minZoom={1}
            maxZoom={10}
            image={imageMetaData.base64URL}
            crop={config.crop}
            zoom={config.zoom}
            rotation={config.rotate}
            aspect={aspectRatioValues[aspectRatio]}
            onCropChange={handleCropChange}
            onRotationChange={handleRotationChange}
            onZoomChange={handleZoomChange}
            onCropComplete={handleCropComplete}
            objectFit={objectFit || 'horizontal-cover'}
            cropShape={cropShape || 'rect'}
            showGrid={showGrid}
          />
        </div>
        <div id="configurations" className="px-5 mt-4 space-y-4">
          <RangeSlider
            min={1}
            max={10}
            step={0.1}
            value={config.zoom}
            onChange={handleZoomChange}
            label="Zoom"
          />
          <RangeSlider
            min={0}
            max={100}
            value={config.rotate}
            onChange={handleRotationChange}
            label="Rotate"
          />
        </div>
        <div className="flex px-5 mt-7 space-x-2">
          <Button
            disabled={isUploading}
            fullWidth
            size={'lg'}
            variant={'danger.outline'}
            rounded={'md'}
            onClick={rest.onHide}
          >
            Cancel
          </Button>
          <Button
            isLoading={isUploading}
            fullWidth
            size={'lg'}
            variant={'neutral.solid'}
            rounded={'md'}
            loaderVersion="v1"
            onClick={handleUpload}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
