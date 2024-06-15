import Editor from '@client/components/ui/Editor';
import { useSelector } from '@client/store';
import { IFeedShot } from '@client/store/slices/shots/feed/state';
import { motion } from 'framer-motion';
import { FC } from 'react';
export const Shot: FC<IFeedShot> = ({ title, content, productId }) => {
  const product = useSelector(
    (state) => state.shots.feed.data.products.entities[productId!]
  );
  const user = useSelector(
    (state) => state.shots.feed.data.users.entities[product!.userId!]
  );
  return (
    <motion.div className="border p-2">
      <div>{user?.firstName}</div>
      <h1 className="block w-full text-lg text-slate-800 disabled:bg-transparent">
        {title}
      </h1>
      <Editor content={content!} className="mt-2" isEditable={false} />
    </motion.div>
  );
};
