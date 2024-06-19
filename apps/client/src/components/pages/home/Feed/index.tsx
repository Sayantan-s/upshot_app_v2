import { feedRef } from '@client/components/shared/Layouts/Rootlayout';
import { useWindowScroll } from '@client/hooks';
import { useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PostFallbackLoading from './Post/Fallback';
import { Shot } from './Shot';

export const Feed = () => {
  const [showAdditionalStyles, setShowAdditionalStyles] = useState(false);
  shotsApi.useFetchFeedShotsQuery();

  useWindowScroll(feedRef, (target) => {
    setShowAdditionalStyles(target.scrollTop > 100);
  });

  const additionalStyles = showAdditionalStyles
    ? 'after:translate-x-0 shadow-sm shadow-slate-100'
    : 'after:-translate-x-full shadow-none';

  const {
    data: { shots },
    loading: isLoading,
    success: isSuccess,
  } = useSelector((state) => state.shots.feed);

  return (
    <div className="h-full">
      <header
        className={`overflow-hidden after:content-[''] after:h-[1px] after:bg-slate-100 after:absolute after:bottom-0 sticky top-0 z-50 after:transition-transform after:w-full after:transform ${additionalStyles}`}
      >
        <h1 className="p-4 text-slate-800 text-xl font-semibold bg-white/70 backdrop-blur-xl">
          Hey, <span className="text-xl text-slate-300">Sayantan</span>{' '}
        </h1>
      </header>
      <motion.div className="mt-4 space-y-3 pl-4">
        {isLoading ? (
          <PostFallbackLoading value={3} />
        ) : isSuccess ? (
          shots.ids.map((shotId) => (
            <Shot {...shots.entities[shotId]} key={shotId} />
          ))
        ) : null}
        {/* <FloatingActionButton
          onSelect={handleSelectWhatAction}
          className="bg-emerald-500 p-4 rounded-full shadow-md shadow-sky-500/30"
          actionButtonIcon={
            <ElementPlus size="24" variant="Bulk" color="white" />
          }
        >
          <FloatingActionButton.Option
            value={FEED_ACTION_TYPES.PRODUCT_ONBOARD}
            className="bg-orange-500 p-4 rounded-full shadow-md"
            tooltip="Onboard your product"
          >
            <Drop size="24" variant="Bulk" color="rgb(255 247 237)" />
          </FloatingActionButton.Option>
          <FloatingActionButton.Option
            value={FEED_ACTION_TYPES.CREATE_A_SHOT}
            className="bg-white p-4 rounded-full shadow-md text-sky-500"
            tooltip="Create a shot"
          >
            <ChemicalGlass size="24" variant="Bulk" />
          </FloatingActionButton.Option>
        </FloatingActionButton> */}
      </motion.div>
    </div>
  );
};
