import { shotsApi } from '@client/store/services/shot';
import { motion, useDragControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { EditableShotCard } from '../EditableShotCard';

/**
 * Once one post is edit clicked
 * - Disable the draggable feature
 * - Make all other posts disabled and blur them
 * - Once done save that target post.
 */

export const ShotPanel = () => {
  const location = useParams();
  const { data } = shotsApi.useFetchOnboardingShotsQuery(
    {
      productId: location.productId!,
    },
    {
      skip: !location.productId,
    }
  );
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [width, setWidth] = useState(0);
  const [currentlyEditingShot, setCurrentlyEditingShot] = useState<
    string | null
  >(null);
  const controls = useDragControls();

  useEffect(() => {
    if (data?.data.length) {
      setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
    }
  }, [data?.data]);

  return (
    <motion.div
      className="overflow-hidden cursor-grab w-[1200px] mx-auto h-full flex justify-center items-start flex-col relative"
      ref={ref}
    >
      <motion.div
        drag="x"
        className="flex items-center space-x-6 flex-nowrap"
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        dragElastic={0.9}
        dragMomentum
        dragControls={controls}
      >
        {data?.data.map((shot) => (
          <EditableShotCard
            key={shot.id}
            {...shot}
            disabled={currentlyEditingShot !== shot.id}
            onEditAndSave={setCurrentlyEditingShot}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
