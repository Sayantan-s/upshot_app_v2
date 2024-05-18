import { Button } from '@client/components/ui';
import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { Add } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'swiper/css';
import { Mousewheel } from 'swiper/modules';
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
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
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
    !Number.isNaN(swiper.realIndex) && setActiveSlideIndex(swiper.realIndex);
  };

  return (
    <div className="flex justify-center flex-col h-full">
      <Swiper
        loop
        mousewheel
        centeredSlides
        modules={[Mousewheel]}
        allowTouchMove={isNotEditing}
        spaceBetween={12}
        slidesPerView={2.65}
        onRealIndexChange={handleSlideChange}
        direction="horizontal"
        className="overflow-x-hidden py-2 cursor-grab w-[1200px] mx-auto flex justify-center items-start flex-col relative"
      >
        <div
          className={`w-1/4 h-full absolute left-0 z-40 bg-gradient-to-r from-white via-white/50 to-white/0`}
        />
        {shotIds?.map((shotId, index) => (
          <SwiperSlide key={data[shotId]?.id}>
            <EditableShotCard
              {...data[shotId]!}
              disabled={!isNotEditing && currentlyEditing !== data[shotId]?.id}
              isActive={activeSlideIndex === index}
              onEdit={handleEdit}
              onSave={handleSave}
            />
          </SwiperSlide>
        ))}
        <div
          className={`w-1/4 h-full absolute right-0 z-40 bg-gradient-to-r from-white/0 via-white/50 to-white`}
        />
        <div slot="container-start" className="mb-10 z-50 w-full">
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
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiper = useSwiper();
  const location = useParams();

  const [createShot, { isLoading: isCreating }] =
    shotsApi.useCreateShotMutation();

  const handleSwipeTo = (index: number) => {
    if (!swiper.isLocked) {
      swiper.slideTo(index);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const handleSwipe = (swipe: SwiperClass) => {
      if (Number.isNaN(swiper.realIndex)) return;
      const { realIndex } = swipe;
      setCurrentIndex(realIndex);
    };
    swiper.on('realIndexChange', handleSwipe);
    return () => {
      swiper.off('realIndexChange', handleSwipe);
    };
  }, [swiper]);

  const handleCreateShot = async () => {
    await createShot({ productId: location.productId! }).unwrap();
    swiper.slideTo(shotIds.length);
    setCurrentIndex(shotIds.length);
  };

  return (
    <div className="flex items-center w-full">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-end flex-1 space-x-2.5">
        <div className="flex space-x-2 items-center bg-gray-100 rounded-full w-max px-2.5 py-1.5 border border-gray-200">
          {shotIds.map((shotId, index) => (
            <button
              onClick={() => handleSwipeTo(index)}
              key={shotId}
              className={`w-6 h-6 shadow flex items-center justify-center text-xs rounded-full ${
                currentIndex === index
                  ? 'bg-gray-700 text-white shadow'
                  : 'bg-white text-gray-400 shadow'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <Button
          isLoading={isCreating}
          variant={'neutral.solid'}
          icon={<Add size={16} color="#ffffff" stroke="2" />}
          onClick={handleCreateShot}
        >
          Add New Shot
        </Button>
      </div>
    </div>
  );
};
