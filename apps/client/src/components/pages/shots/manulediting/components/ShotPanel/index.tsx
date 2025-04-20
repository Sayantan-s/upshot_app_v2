import { Button } from '@client/components/ui';
import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { ArchiveStatus } from '@client/store/types/shot';
import { Add } from 'iconsax-react';
import { KeyboardEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import 'swiper/css';
import { FreeMode } from 'swiper/modules';
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
import { twMerge } from 'tailwind-merge';

/**
 * Once one post is edit clicked
 * - Disable the draggable feature -> IDLE | EDITING | IDLE
 * - Make all other posts disabled and blur them
 * - Once done save that target post.
 */

export const ShotPanel = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
    console.log('swiper.realIndex', swiper.realIndex);
    !Number.isNaN(swiper.realIndex) && setActiveSlideIndex(swiper.realIndex);
  };

  const shotIds =
    archiveStatus === ArchiveStatus.ARCHIVED ? archived : unArchived;

  const configBlocker = shotIds.length > 2;

  return (
    <div className="flex justify-center h-[120vh] flex-col">
      <Swiper
        loop={configBlocker}
        centeredSlides
        modules={[FreeMode]}
        spaceBetween={12}
        slidesPerView={2.65}
        onRealIndexChange={handleSlideChange}
        direction="horizontal"
        className="overflow-x-hidden  py-2 cursor-grab w-[1200px] h-[700px] mx-auto flex justify-center items-start flex-col relative"
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
          className="mb-20 flex items-center z-50 w-full bg-white"
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiper = useSwiper();
  const location = useParams();

  const [createShot, { isLoading: isCreating }] =
    shotsApi.useCreateShotMutation();

  const handleSwipeTo = (index: number) => {
    // if (index >= 1 && index <= shotIds.length && !swiper.isLocked) {
    //   swiper.slideTo(index);
    //   setCurrentIndex(index);
    // }
    if (index >= 1 && index <= shotIds.length && !swiper.isLocked) {
      swiper.slideTo(index - 1); // Subtract 1 for zero-based index
      setCurrentIndex(index - 1); // Subtract 1 for zero-based index
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
        <div className="border px-2 py-1 rounded-full">
          <Pagination
            currentPage={currentIndex + 1}
            onPageChange={handleSwipeTo}
            totalPages={shotIds.length}
            previousButtonClassName="bg-gray-200 text-gray-700 h-7 px-3 flex items-center justify-center text-xs rounded-full"
            nextButtonClassName="bg-gray-200 text-gray-700 h-7 px-3 flex items-center justify-center text-xs rounded-full"
            paginationButtonClassName="w-7 h-7 shadow-sm shadow-gray-900/20 flex items-center justify-center text-xs rounded-full text-xs text-gray-700 border-gray-100 border transition-all duration-200 aria-[current]:bg-gray-900 aria-[current]:pointer-events-none aria-[current]:font-medium aria-[current]:text-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            maxVisiblePages={3}
          />
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

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  className?: string;
  maxMovementAllowed?: number;
  ref?: React.Ref<HTMLDivElement>;
  previousButtonClassName: string;
  nextButtonClassName: string;
  paginationButtonClassName: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className,
  maxMovementAllowed,
  previousButtonClassName,
  nextButtonClassName,
  paginationButtonClassName,
  ref,
}: PaginationProps) => {
  const maxMovement = maxMovementAllowed || totalPages;
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    console.log('currentPage, maxMovement', currentPage, maxMovement);
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < maxMovement) {
      onPageChange(currentPage + 1);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    else if (e.key === 'ArrowRight') handleNext();
    else if (e.key === 'Home') onPageChange(1);
    else if (e.key === 'End') onPageChange(totalPages);
  };

  // Calculate which page numbers to show
  const getVisiblePageNumbers = () => {
    const pageNumbers = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div
      className={twMerge('flex items-center justify-center gap-2', className)}
      ref={ref}
      onKeyDown={handleKeyDown}
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={previousButtonClassName}
        aria-label="Previous page"
      >
        Previous
      </button>

      {showPageNumbers && (
        <div className="flex items-center gap-1">
          {getVisiblePageNumbers().map((pageNumber, index) => {
            if (
              pageNumber === 'ellipsis-start' ||
              pageNumber === 'ellipsis-end'
            ) {
              return (
                <div
                  key={`${pageNumber}-${index}`}
                  className="flex items-center justify-center w-9 h-9"
                >
                  ...{' '}
                </div>
              );
            }

            console.log('pageNumber, currentPage', pageNumber, currentPage);

            return (
              <button
                disabled={+pageNumber > maxMovement}
                key={pageNumber}
                className={twMerge(paginationButtonClassName)}
                onClick={() => onPageChange(pageNumber as number)}
                aria-label={`Page ${pageNumber}`}
                aria-current={pageNumber === currentPage ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage >= maxMovement}
        className={nextButtonClassName}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};
