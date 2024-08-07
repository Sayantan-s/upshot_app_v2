import { Loader } from '@client/components/ui';
import { shotsApi } from '@client/store/services/shot';
import { useDebounceCallback } from '@react-hook/debounce';
import { SearchNormal1 } from 'iconsax-react';
import { ChangeEventHandler } from 'react';
import { useParams } from 'react-router-dom';

export const ShotSearch = () => {
  const location = useParams();
  const [searchShots, { isLoading }] =
    shotsApi.useLazyFetchOnboardingShotsQuery();
  const searchShotDebounced = useDebounceCallback(searchShots, 500, false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (eve) => {
    const { value } = eve.target;
    if (value.trim().length > 2)
      await searchShotDebounced({
        productId: location.productId!,
        search: value,
      });
    else
      await searchShotDebounced({
        productId: location.productId!,
        search: value,
      });
  };

  return (
    <div className="bg-white p-2.5 h-full flex space-x-2 items-center border-b w-72">
      <input
        type="text"
        placeholder="e.g. search for..."
        className="bg-transparent w-full placeholder:text-gray-400 text-gray-800 focus:outline-none"
        onChange={handleChange}
      />
      {isLoading ? (
        <Loader size={'sm'} variant={'primary.flat'} />
      ) : (
        <SearchNormal1 size={14} color="#9ca3af" />
      )}
    </div>
  );
};
