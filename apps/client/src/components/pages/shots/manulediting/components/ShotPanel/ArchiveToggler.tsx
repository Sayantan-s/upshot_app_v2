import { useDispatch, useSelector } from '@client/store';
import { shotActions } from '@client/store/slices/shots';
import { ArchiveStatus } from '@client/store/types/shot';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useSearchParams } from 'react-router-dom';

export const ArchiveToggler = () => {
  const [, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { archived, shots } = useSelector((state) => state.shots.manualEdits);

  const handleOnValueChange = (value: ArchiveStatus) => {
    dispatch(shotActions.setArchivedStatus(value));
    setSearchParams({ archived: String(value === ArchiveStatus.ARCHIVED) });
  };

  return (
    <ToggleGroup.Root
      className="flex bg-gray-100 p-2 space-x-2 border rounded-md"
      type="single"
      value={archived}
      onValueChange={handleOnValueChange}
    >
      <ToggleGroup.Item
        className="px-2 py-1.5 w-28 rounded-md space-x-2 flex items-center justify-center data-[state=on]:bg-white data-[state=off]:bg-transparent data-[state=off]:opacity-60"
        value={ArchiveStatus.UNARCHIVED}
      >
        <span>All</span>{' '}
        <span className="bg-gray-800 text-gray-50 w-5 h-5 text-[9px] flex items-center justify-center rounded-full">
          {shots.unArchived.length}
        </span>
      </ToggleGroup.Item>
      <ToggleGroup.Item
        className="px-2 py-1.5 w-28 rounded-md space-x-2 flex items-center justify-center data-[state=on]:bg-white data-[state=off]:bg-transparent data-[state=off]:opacity-60"
        value={ArchiveStatus.ARCHIVED}
      >
        <span>Archived</span>{' '}
        <span className="bg-gray-800 text-gray-50 w-5 h-5 text-[9px] flex items-center justify-center rounded-full">
          {shots.archived.length}
        </span>
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
