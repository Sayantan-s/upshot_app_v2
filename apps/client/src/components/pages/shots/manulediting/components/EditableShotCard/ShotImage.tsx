import { Add, GalleryTick } from 'iconsax-react';

export const ShotImage = () => {
  return (
    <div
      id="img"
      className="flex-1 border aspect-video overflow-hidden rounded-lg relative"
    >
      <div className="w-full h-full filter blur-md bg-gray-50 flex items-center justify-center">
        <GalleryTick variant="Bulk" size={64} color="#0f172a80" />
      </div>
      <div className="absolute bottom-3 right-3 flex items-center space-x-1.5">
        <button className="w-7 h-7 bg-emerald-500 shadow rounded-full flex items-center justify-center">
          <Add size={14} color="#fff" />
        </button>
        {/* <button className="w-7 h-7 border bg-white shadow rounded-full flex items-center justify-center">
          <GalleryEdit size={14} />
        </button> */}
      </div>
    </div>
  );
};
