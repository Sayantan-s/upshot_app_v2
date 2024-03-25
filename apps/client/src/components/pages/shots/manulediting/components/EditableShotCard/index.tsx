import { IShot } from '@client/store/types/shot';
import { FC } from 'react';

export const EditableShotCard: FC<Omit<IShot, 'id'>> = () => {
  return (
    <div className="w-[400px] h-[400px] aspect-square border rouned-lg whitespace-nowrap">
      PostCard
    </div>
  );
};
