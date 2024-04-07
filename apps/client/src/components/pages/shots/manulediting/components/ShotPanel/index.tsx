import { useDispatch, useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { shotActions } from '@client/store/slices/shots';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [width, setWidth] = useState(0);
  const [isNotEditing, setIsNotEditing] = useState(true);

  useEffect(() => {
    if (shotIds.length)
      setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
  }, [shotIds?.length]);

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
      <motion.div
        className="overflow-hidden cursor-grab w-[1200px] mx-auto flex justify-center items-start flex-col relative"
        ref={ref}
      >
        <motion.div
          drag="x"
          className="flex items-center space-x-6 flex-nowrap"
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={{ bounceDamping: 30 }}
          dragElastic={0.9}
          dragMomentum
          dragListener={isNotEditing}
        >
          {shotIds?.map((shotId) => (
            <EditableShotCard
              key={data[shotId]?.id}
              {...data[shotId]!}
              disabled={!isNotEditing && currentlyEditing !== data[shotId]?.id}
              onEdit={handleEdit}
              onSave={handleSave}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
