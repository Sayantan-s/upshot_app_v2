import { feedRef } from '@client/components/shared/Layouts/Rootlayout';
import { FloatingActionButton } from '@client/components/ui/FloatingActionButton';
import { useWindowScroll } from '@client/hooks';
import { motion } from 'framer-motion';
import { ChemicalGlass, DollarCircle, Drop, ElementPlus } from 'iconsax-react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import Post from './Post';
import PostFallbackLoading from './Post/Fallback';
import { PostTool } from './PostTool';

enum FEED_ACTION_TYPES {
  PRODUCT_UPLOAD = 'PRODUCT_UPLOAD',
  PROMOTE_PRODUCT = 'PRODUCT_PROMOTE',
  SELL_PRODUCT = 'PRODUCT_SELL',
}

export const Feed = () => {
  const { isLoading, isSuccess, data } = {
    isLoading: true,
    isSuccess: false,
    data: { data: [] },
  };

  const [showAdditionalStyles, setShowAdditionalStyles] = useState(false);
  const navigate = useNavigate();

  useWindowScroll(feedRef, (target) => {
    setShowAdditionalStyles(target.scrollTop > 100);
  });

  const additionalStyles = showAdditionalStyles
    ? 'after:translate-x-0 shadow-sm shadow-slate-100'
    : 'after:-translate-x-full shadow-none';

  // handlers

  const handleSelectWhatAction = (value: string) => {
    if (value === FEED_ACTION_TYPES.PRODUCT_UPLOAD)
      return navigate('/product/upload');
  };

  return (
    <div>
      <header
        className={`overflow-hidden after:content-[''] after:h-[1px] after:bg-slate-100 after:absolute after:bottom-0 sticky top-0 z-10 after:transition-transform after:w-full after:transform ${additionalStyles}`}
      >
        <h1 className="p-4 text-slate-800 text-xl font-semibold bg-white/70 backdrop-blur-xl">
          Hey, <span className="text-xl text-slate-300">Sayantan</span>{' '}
        </h1>
      </header>
      <PostTool />
      <motion.div className="mt-4 space-y-3 pl-4 relative">
        {isLoading ? (
          <PostFallbackLoading value={3} />
        ) : isSuccess ? (
          <Fragment>
            {data.data.map((post: any) => (
              <Post {...post} />
            ))}
            {/* <FloatingActionButton /> */}
          </Fragment>
        ) : null}
        <FloatingActionButton
          onSelect={handleSelectWhatAction}
          className="bg-emerald-500 p-4 rounded-full shadow-md shadow-sky-500/30"
          actionButtonIcon={
            <ElementPlus size="24" variant="Bulk" color="white" />
          }
        >
          <FloatingActionButton.Option
            value={FEED_ACTION_TYPES.PRODUCT_UPLOAD}
            className="bg-orange-500 p-4 rounded-full shadow-md"
            tooltip="Upload Product"
          >
            <Drop size="24" variant="Bulk" color="rgb(255 247 237)" />
          </FloatingActionButton.Option>
          <FloatingActionButton.Option
            value={FEED_ACTION_TYPES.PROMOTE_PRODUCT}
            className="bg-white p-4 rounded-full shadow-md text-sky-500"
            tooltip="Promote"
          >
            <ChemicalGlass size="24" variant="Bulk" />
          </FloatingActionButton.Option>
          <FloatingActionButton.Option
            value={FEED_ACTION_TYPES.SELL_PRODUCT}
            className="bg-white p-4 rounded-full shadow-md text-sky-500"
            tooltip="Sell Product"
          >
            <DollarCircle size="24" variant="Bulk" />
          </FloatingActionButton.Option>
        </FloatingActionButton>
      </motion.div>
    </div>
  );
};
