import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'swiper/css';
import {
  Swiper,
  SwiperClass,
  SwiperProps,
  SwiperSlide,
  useSwiper,
} from 'swiper/react';
import { EditableShotCard } from '../EditableShotCard';

/**
 * Once one post is edit clicked
 * - Disable the draggable feature -> IDLE | EDITING | IDLE
 * - Make all other posts disabled and blur them
 * - Once done save that target post.
 */

export const ShotPanel = () => {
  const location = useParams();
  shotsApi.useFetchOnboardingShotsQuery(
    {
      productId: location.productId!,
    },
    {
      skip: !location.productId,
    }
  );
  const { entities: data, ids: shotIds } = useSelector(
    (state) => state.shots.manualEdits.shots
  );
  const dispatch = useDispatch();

  const currentlyEditing = useSelector(
    (state) => state.shots.manualEdits.currentlyEditing
  );
  const [isNotEditing, setIsNotEditing] = useState(true);
  const [gradients, setGradients] = useState({ left: false, right: true });

  const handleEdit = (id: string) => {
    dispatch(
      shotActions.setupCurrentlyEditing({
        chosenEditingShotId: id,
      })
    );
    setIsNotEditing(false);
  };

  const handleSave = () => {
    dispatch(shotActions.flushCurrentlyEditing());
    setIsNotEditing(true);
  };

  const handleSlideChange: SwiperProps['onSlideChange'] = (swiper) => {
    if (swiper.isBeginning)
      setGradients((prevState) => ({ ...prevState, left: false }));
    else if (swiper.isEnd)
      setGradients((prevState) => ({ ...prevState, right: false }));
    else setGradients({ left: true, right: true });
  };

  return (
    <div className="flex justify-center flex-col h-full">
      <Swiper
        allowTouchMove={isNotEditing}
        spaceBetween={12}
        slidesPerView={3}
        onSlideChange={handleSlideChange}
        direction="horizontal"
        className="overflow-x-hidden cursor-grab w-[1200px] mx-auto flex justify-center items-start flex-col relative"
      >
        <div
          className={`w-16 h-full absolute left-0 z-40 bg-gradient-to-r from-white via-white/50 to-white/0 ${
            gradients.left ? 'visible' : 'hidden'
          }`}
        />
        {shotIds?.map((shotId) => (
          <SwiperSlide key={data[shotId]?.id}>
            <EditableShotCard
              {...data[shotId]!}
              disabled={!isNotEditing && currentlyEditing !== data[shotId]?.id}
              onEdit={handleEdit}
              onSave={handleSave}
            />
          </SwiperSlide>
        ))}
        <div
          className={`w-16 h-full absolute right-0 z-40 bg-gradient-to-r from-white/0 via-white/50 to-white ${
            gradients.right ? 'visible' : 'hidden'
          }`}
        />
        <div slot="container-start" className="mb-6 z-50">
          <SwiperPagination />
        </div>
      </Swiper>
    </div>
  );
};

const SwiperPagination = () => {
  const { ids: shotIds } = useSelector(
    (state) => state.shots.manualEdits.shots
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiper = useSwiper();

  const handleSwipeTo = (index: number) => {
    if (!swiper.isLocked) {
      swiper.slideTo(index);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const handleSwipe = (swipe: SwiperClass) => {
      const { activeIndex } = swipe;
      setCurrentIndex(activeIndex);
    };
    swiper.on('slideChange', handleSwipe);
    return () => {
      swiper.off('slideChange', handleSwipe);
    };
  }, [swiper]);

  return (
    <div className="w-full max-w-[1200px] mx-auto space-x-2 flex">
      {shotIds.map((shotId, index) => (
        <button
          onClick={() => handleSwipeTo(index)}
          key={shotId}
          className={`w-7 h-7 bg-white shadow flex items-center justify-center text-xs rounded-full ${
            currentIndex === index
              ? 'bg-slate-700 text-white shadow-slate-800/20'
              : 'bg-white text-slate-400'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
