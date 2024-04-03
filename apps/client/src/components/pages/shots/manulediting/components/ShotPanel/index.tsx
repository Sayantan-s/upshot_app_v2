import { shotsApi } from '@client/store/services/shot';
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
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null);
  const [isNotEditing, setIsNotEditing] = useState(true);

  useEffect(() => {
    if (data?.data.length)
      setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
  }, [data?.data]);

  const handleEdit = (id: string) => {
    setIsNotEditing(false);
    setCurrentlyEditing(id);
  };

  const handleSave = () => {
    setIsNotEditing(true);
    setCurrentlyEditing(null);
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
          {data?.data.map((shot) => (
            <EditableShotCard
              key={shot.id}
              {...shot}
              disabled={!isNotEditing && currentlyEditing !== shot.id}
              onEdit={handleEdit}
              onSave={handleSave}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
