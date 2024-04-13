import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import useEmblaCarousel from 'embla-carousel-react';
import { useState } from 'react';
import { useParams } from 'react-router';
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
  const [carouselRef] = useEmblaCarousel({
    dragFree: true,
    align: 'end',
    skipSnaps: true,
  });

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

  return (
    <div className="flex justify-center items-center h-full">
      <div className="mx-auto max-w-[1200px] flex justify-center items-start flex-col relative">
        <div className="overflow-hidden" ref={carouselRef}>
          <div className="flex items-center space-x-6 flex-nowrap">
            {shotIds?.map((shotId) => (
              <EditableShotCard
                key={data[shotId]?.id}
                {...data[shotId]!}
                disabled={
                  !isNotEditing && currentlyEditing !== data[shotId]?.id
                }
                onEdit={handleEdit}
                onSave={handleSave}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
