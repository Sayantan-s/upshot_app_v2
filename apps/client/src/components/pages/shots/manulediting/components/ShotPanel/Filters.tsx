import { useToggle } from '@client/hooks';
import * as Popover from '@radix-ui/react-popover';
import { Filter } from 'iconsax-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShotStatus } from '@client/store/types/shot';

interface IFilterContract {
  status: ShotStatus[];
  isArchived: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  launchedAt: number | null;
}

export const Filters = () => {
  const [open, { setState }] = useToggle();

  const [filters, setFilters] = useState<IFilterContract>({
    status: [],
    isArchived: false,
    createdAt: null,
    updatedAt: null,
    launchedAt: null,
  });

  return (
    <Popover.Root open={open} onOpenChange={setState}>
      <Popover.Trigger className="flex items-stretch z-10">
        <motion.button className="disabled:grayscale border border-gray-500/20 bg-gray-50 rounded-xl flex items-center justify-center aspect-square w-auto h-full">
          <Filter size={14} />
        </motion.button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-white border border-gray-200 max-w-[350px] z-40 focus:outline-none shadow shadow-gray-800/10 rounded-xl"
          sticky="always"
          sideOffset={5}
        >
          <div className="p-4 w-60"></div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
