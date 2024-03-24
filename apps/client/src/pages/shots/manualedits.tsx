import { shotsApi } from '@client/store/services/shot';
import { useParams } from 'react-router-dom';

export const ManualEdits = () => {
  const location = useParams();
  console.log(location);
  const { isLoading, data } = shotsApi.useFetchOnboardingShotsQuery(
    {
      productId: location.productId!,
    },
    {
      skip: !location.productId,
    }
  );
  return <div> {isLoading ? 'loading...' : JSON.stringify(data)}</div>;
};
