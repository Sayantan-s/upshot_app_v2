import { GetShotsQuery } from '@client/__generated__/graphql';
import Editor from '@client/components/ui/Editor';
import { motion } from 'framer-motion';
import { FC } from 'react';
export const Shot: FC<GetShotsQuery['getShots'][number]> = ({
  title,
  content,
}) => {
  return (
    <motion.div className="border p-2">
      <h1 className="block w-full text-lg text-slate-800 disabled:bg-transparent">
        {title}
      </h1>
      <Editor content={content!} className="mt-2" />
    </motion.div>
  );
};
