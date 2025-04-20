import { useDispatch, useSelector } from '@client/store';
import { shotActions } from '@client/store/slices/shots';
import { ArchiveStatus } from '@client/store/types/shot';
//import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Tabs from '@radix-ui/react-tabs'

// export const ArchiveToggler = () => {
//   const dispatch = useDispatch();
//   const { archived, shots } = useSelector((state) => state.shots.manualEdits);

//   const handleOnValueChange = (value: ArchiveStatus) =>
//     dispatch(shotActions.setArchivedStatus(value));

//   return (
//     <ToggleGroup.Root
//       className="flex bg-gray-100 p-1.5 rounded-full space-x-2 border"
//       type="single"
//       value={archived}
//       onValueChange={handleOnValueChange}
//     >
//       <ToggleGroup.Item
//         className="p-[0.42rem] w-28 rounded-full space-x-2 flex items-center justify-center data-[state=on]:shadow-sm data-[state=on]:shadow-gray-900/15 data-[state=on]:bg-white data-[state=off]:bg-transparent data-[state=off]:opacity-60"
//         value={ArchiveStatus.UNARCHIVED}
//       >
//         <span className="text-xs">All</span>{' '}
//         <span className="bg-gray-800 text-gray-50 w-4 h-4 text-[8px] flex items-center justify-center rounded-full">
//           {shots.unArchived.length}
//         </span>
//       </ToggleGroup.Item>
//       <ToggleGroup.Item
//         className="p-[0.42rem] w-28 rounded-full space-x-2 flex items-center justify-center data-[state=on]:shadow-sm data-[state=on]:shadow-gray-900/15 data-[state=on]:bg-white data-[state=off]:bg-transparent data-[state=off]:opacity-60"
//         value={ArchiveStatus.ARCHIVED}
//       >
//         <span className="text-xs">Archived</span>{' '}
//         <span className="bg-gray-800 text-gray-50 w-4 h-4 text-[8px] flex items-center justify-center rounded-full">
//           {shots.archived.length}
//         </span>
//       </ToggleGroup.Item>
//     </ToggleGroup.Root>
//   );
// };

export const ArchiveToggler = () => {
  const dispatch = useDispatch();
  const { archived, shots } = useSelector((state) => state.shots.manualEdits);

  const handleOnValueChange = (value: string) =>
    dispatch(shotActions.setArchivedStatus(value as ArchiveStatus));

  return (
    <Tabs.Root  
      className="flex"
      defaultValue={archived}
      onValueChange={handleOnValueChange}
    >
		  <Tabs.List className="flex bg-gray-100 p-1.5 rounded-full space-x-2 border" aria-label="Manage Your Shots">
        <Tabs.Trigger 
          className="p-[0.42rem] w-28 rounded-full space-x-2 flex items-center justify-center data-[state=active]:shadow-sm data-[state=active]:shadow-gray-900/15 data-[state=active]:bg-white data-[state=inactive]:bg-transparent data-[state=inactive]:opacity-60"
          value={ArchiveStatus.UNARCHIVED}
        >
				  <span className="text-xs">All</span>{' '}
          <span className="bg-gray-800 text-gray-50 w-4 h-4 text-[8px] flex items-center justify-center rounded-full">
            {shots.unArchived.length}
          </span>
			  </Tabs.Trigger>
        <Tabs.Trigger 
          className="p-[0.42rem] w-28 rounded-full space-x-2 flex items-center justify-center data-[state=active]:shadow-sm data-[state=active]:shadow-gray-900/15 data-[state=active]:bg-white data-[state=inactive]:bg-transparent data-[state=inactive]:opacity-60"
          value={ArchiveStatus.ARCHIVED}
        >
				  <span className="text-xs">Archived</span>{' '}
          <span className="bg-gray-800 text-gray-50 w-4 h-4 text-[8px] flex items-center justify-center rounded-full">
            {shots.archived.length}
          </span>
			  </Tabs.Trigger>
		  </Tabs.List>
    </Tabs.Root>
  );
};
