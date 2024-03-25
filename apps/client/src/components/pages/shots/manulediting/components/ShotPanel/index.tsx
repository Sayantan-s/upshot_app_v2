import { shotsApi } from '@client/store/services/shot';
import { useParams } from 'react-router';
import { EditableShotCard } from '../EditableShotCard';

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
  return (
    <div className="flex items-center space-x-6 w-[1200px] flex-nowrap overflow-auto">
      {data?.data.map(({ id, ...shotCard }) => (
        <EditableShotCard key={id} {...shotCard} />
      ))}
    </div>
  );
};
