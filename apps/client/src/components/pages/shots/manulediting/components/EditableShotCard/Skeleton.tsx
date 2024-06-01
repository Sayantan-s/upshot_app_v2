import { GalleryTick } from 'iconsax-react';

export const Skeleton = () => {
  return (
    <div>
      <div className="my-2 flex justify-between">
        <div className="h-8 aspect-video rounded-full bg-gray-100 border" />
        <div className="space-x-1.5 flex items-center">
          <div className="w-8 h-8 aspect-square bg-gray-100 rounded-full" />
          <div className="w-8 h-8 aspect-square bg-gray-100 rounded-full" />
          <div className="w-8 h-8 aspect-square bg-gray-100 rounded-full" />
        </div>
      </div>
      <div
        className={`bg-white shadow-md shadow-slate-900/5 aspect-square border rounded-lg rouned-lg whitespace-nowrap flex flex-col`}
      >
        <header className="px-3 pt-3 flex justify-between items-start w-full">
          <div id="user_dtl" className="flex items-center space-x-2 w-full">
            <div className="flex-[0.1] animate-pulse">
              <div className="w-12 h-12 bg-gray-100 relative overflow-hidden rounded-full border p-1"></div>
            </div>
            <div className="w-full space-y-1 flex-[0.9] animate-pulse">
              <p className="bg-gray-100 h-4 w-1/3 rounded-xl" />
              <p className="bg-gray-100 h-4 w-2/3 rounded-xl" />
            </div>
          </div>
        </header>
        <div id="content" className="px-3 mt-4 animate-pulse">
          <div className="block w-2/3 text-lg bg-gray-100 h-4 rounded-xl" />
          <div className="h-36 overflow-y-scroll space-y-1.5 mt-3">
            <p className="bg-gray-100 h-4 w-full rounded-xl" />
            <p className="bg-gray-100 h-4 w-full rounded-xl" />
            <p className="bg-gray-100 h-4 w-full rounded-xl" />
          </div>
        </div>
        <div className="p-3">
          <div
            id="img"
            className="animate-pulse flex-1 border aspect-video overflow-hidden rounded-lg relative"
          >
            <div className="w-full h-full filter blur-md bg-gray-50 flex items-center justify-center">
              <GalleryTick variant="Bulk" size={64} color="#0f172a80" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 h-11 w-2/3 bg-gray-100 mx-auto rounded-full" />
    </div>
  );
};
