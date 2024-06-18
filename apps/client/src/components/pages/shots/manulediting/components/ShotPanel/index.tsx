import { Button } from '@client/components/ui';
import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { ArchiveStatus } from '@client/store/types/shot';
import { Add } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
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
import { Skeleton } from '../EditableShotCard/Skeleton';
import { ArchiveToggler } from './ArchiveToggler';
import { ShotSearch } from './ShotSearch';

/**
 * Once one post is edit clicked
 * - Disable the draggable feature -> IDLE | EDITING | IDLE
 * - Make all other posts disabled and blur them
 * - Once done save that target post.
 */

export const ShotPanel = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);

  const location = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';

  shotsApi.useFetchOnboardingShotsQuery(
    {
      productId: location.productId!,
      search,
    },
    {
      skip: !location.productId,
    }
  );
  const {
    entities: data,
    isLoading,
    archived,
    unArchived,
  } = useSelector((state) => state.shots.manualEdits.shots);
  const { archived: archiveStatus } = useSelector(
    (state) => state.shots.manualEdits
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

  const shotIds =
    archiveStatus === ArchiveStatus.ARCHIVED ? archived : unArchived;

  const configBlocker = shotIds.length > 2;

  return (
    <div className="flex justify-center h-screen flex-col">
      <Swiper
        loop={configBlocker}
        mousewheel
        centeredSlides
        modules={[Mousewheel]}
        allowTouchMove={isNotEditing}
        spaceBetween={12}
        slidesPerView={2.65}
        onRealIndexChange={handleSlideChange}
        direction="horizontal"
        className="overflow-x-hidden py-2 cursor-grab w-[1200px] h-[700px] mx-auto flex justify-center items-start flex-col relative"
      >
        <div
          className={`w-1/4 h-full absolute left-0 z-40 bg-gradient-to-r from-white via-white/50 to-white/0`}
        />
        {isLoading
          ? new Array(4).fill(true).map((_, index) => (
              <SwiperSlide key={index}>
                <Skeleton />
              </SwiperSlide>
            ))
          : shotIds?.map((shotId, index) => (
              <SwiperSlide key={data[shotId]?.id}>
                <EditableShotCard
                  {...data[shotId]!}
                  disabled={
                    !isNotEditing && currentlyEditing !== data[shotId]?.id
                  }
                  isActive={activeSlideIndex === index}
                  onEdit={handleEdit}
                  onSave={handleSave}
                />
              </SwiperSlide>
            ))}
        <div
          className={`w-1/4 h-full absolute right-0 z-40 bg-gradient-to-r from-white/0 via-white/50 to-white`}
        />
        <div
          slot="container-start"
          className="mb-10 flex items-center z-50 w-full"
        >
          <div className="flex items-stretch space-x-3">
            <ArchiveToggler />
            <ShotSearch />
          </div>
          <SwiperPagination />
        </div>
      </Swiper>
    </div>
  );
};

const SwiperPagination = () => {
  const { archived: archiveStatus, shots } = useSelector(
    (state) => state.shots.manualEdits
  );
  const shotIds =
    archiveStatus === ArchiveStatus.ARCHIVED
      ? shots.archived
      : shots.unArchived;
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
