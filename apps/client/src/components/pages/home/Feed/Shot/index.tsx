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
    <motion.div className="border border-slate-200 bg-white shadow-sm p-3 rounded-lg">
      <div className="relative flex">
        <div className="bg-gray-100 rounded-full relative z-20">
          <img
            src={user!.profilePic!}
            alt={`${user?.firstName} profile pic`}
            className="w-14 rounded-full border"
          />
        </div>
        <img
          src={product!.media!.productLogo!.current!}
          alt={`${product?.productName} profile pic`}
          className="w-14 rounded-full absolute transform translate-x-3/4"
        />
      </div>
      <div className="font-semibold text-gray-700 text-sm">
        {user?.firstName}
      </div>

      <h1 className="block w-full text-lg text-slate-800 disabled:bg-transparent">
        {title}
      </h1>
      <Editor content={content!} className="mt-2" isEditable={false} />
    </motion.div>
  );
};
