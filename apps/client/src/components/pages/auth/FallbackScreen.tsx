import { Loader } from '@client/components/ui';
import { motion } from 'framer-motion';
export const FallbackScreen = () => {
  return (
    <motion.div
      className="flex items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center flex-col justify-center text-sm space-y-1">
        <Loader size={'xl'} version="v1" variant={'neutral.ghost'} />
        <p className="inline-block font-semibold text-slate-500">
          Polishing pixels, one at a time.
        </p>
      </div>
    </motion.div>
  );
};
