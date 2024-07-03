import Editor from '@client/components/ui/Editor';
import { formatTimeDifference } from '@client/helpers/date';
import { useSelector } from '@client/store';
import { IFeedShot } from '@client/store/slices/shots/feed/state';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { Link } from 'react-router-dom';
export const Shot: FC<IFeedShot> = ({
  title,
  content,
  productId,
  launchedAt,
}) => {
  const product = useSelector(
    (state) => state.shots.feed.data.products.entities[productId!]
  );
  const user = useSelector(
    (state) => state.shots.feed.data.users.entities[product!.userId!]
  );
  return (
    <motion.div className="border border-slate-200 bg-white shadow-sm p-3 rounded-lg">
      <div id="user-product-dtl" className="flex space-x-2">
        <div className="relative flex items-center">
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
            className="w-14 rounded-full relative right-6"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-gray-700 text-sm relative right-6">
            {user?.firstName} {user?.lastName}
            &nbsp;<span>&middot;</span>&nbsp;
            <Link to={'/'} className="text-xs text-emerald-500">
              @{user?.userName}
            </Link>
          </p>
          <p className="text-gray-300 text-sm relative right-6">
            {formatTimeDifference(new Date(launchedAt! * 1000))}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <h1 className="block w-full text-lg text-slate-800 disabled:bg-transparent">
          {title}
        </h1>
        <Editor content={content!} className="mt-2" isEditable={false} />
      </div>
      <div
        id="shot-photos-fallback"
        className="overflow-hidden rounded-lg mt-2 bg-gray-100 border w-full aspect-video"
      ></div>
    </motion.div>
  );
};
