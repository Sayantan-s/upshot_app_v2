import { motion } from "framer-motion";
import { Image } from "iconsax-react";

export const PostFallback = () => {
  return (
    <motion.div className="p-3 rounded-xl bg-slate-50/70 w-full">
      <button className="float-right flex flex-col space-y-0.5">
        <span className="bg-slate-100 w-1 h-1 rounded-full" />
        <span className="bg-slate-100 w-1 h-1 rounded-full" />
        <span className="bg-slate-100 w-1 h-1 rounded-full" />
      </button>
      <div className="flex space-x-2">
        <div className="w-16 h-16 rounded-[50%] overflow-hidden relative bg-slate-100" />
        <div className="flex-1">
          <h1 className="flex space-x-2 items-center">
            <span className="bg-slate-100 w-10 aspect-video rounded-2xl" />
            <span> &middot;</span>
            <span
              className={`block px-3 py-1 bg-slate-100 w-10 aspect-video rounded-2xl`}
            />
          </h1>
          <p className="mt-1.5 truncate bg-slate-100 w-1/2 h-3 aspect-video rounded-2xl" />
          <span className="block mt-1.5 bg-slate-100 w-1/4 h-3 aspect-video rounded-2xl" />
        </div>
      </div>
      <div className="mt-4">
        <div>
          <h1 className="aspect-video bg-slate-100 w-7/12 h-3 rounded-2xl line-clamp-2" />
          <p className="bg-slate-100 w-full h-3 rounded-2xl line-clamp-2 mt-1.5" />
          <p className="bg-slate-100 w-10/12 h-3 rounded-2xl line-clamp-2 mt-1.5" />
        </div>
      </div>
      <div className="mt-2 flex gap-2 w-full aspect-video bg-slate-100 rounded-xl justify-center items-center">
        <Image variant="Bulk" size={100} />
      </div>
      <div className="mt-3 flex justify-between">
        <div className="flex space-x-1.5">
          <button className="bg-slate-100 flex items-center w-6 h-6 rounded-full"></button>
          <button className="bg-slate-100 flex items-center w-6 h-6 rounded-full"></button>
        </div>
        <span className="bg-slate-100 w-20 h-8 rounded-2xl" />
      </div>
    </motion.div>
  );
};

interface Props {
  value: number;
}

const PostFallbackLoading = ({ value = 3 }: Props) => {
  const compos = new Array(value)
    .fill(true)
    .map((_, i) => i + 1)
    .map((key) => <PostFallback key={key} />);
  return <>{compos}</>;
};

export default PostFallbackLoading;
