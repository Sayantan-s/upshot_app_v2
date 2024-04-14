import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { useState } from 'react';
import { useParams } from 'react-router';
import 'swiper/css';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
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
    <div className="flex justify-center items-center h-full">
      <Swiper
        allowTouchMove={isNotEditing}
        spaceBetween={12}
        slidesPerView={3}
        onSlideChange={handleSlideChange}
        direction="horizontal"
        className="overflow-hidden cursor-grab w-[1200px] mx-auto flex justify-center items-start flex-col relative"
      >
        <div
          className={`w-16 h-full absolute left-0 z-50 bg-gradient-to-r from-white via-white/50 to-white/0 ${
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
          className={`w-16 h-full absolute right-0 z-50 bg-gradient-to-r from-white/0 via-white/50 to-white ${
            gradients.right ? 'visible' : 'hidden'
          }`}
        />
      </Swiper>
    </div>
  );
};
