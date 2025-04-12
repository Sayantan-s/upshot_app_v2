import { Button } from '@client/components/ui';
import { useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import * as Toggle from '@radix-ui/react-toggle';
import { Share } from 'iconsax-react';
import { useState } from 'react';
import { DateTimePicker } from './DateTimePicker';

export const Toolbar = () => {
  const [scheduleOne, { isLoading: isScheduling }] =
    shotsApi.useScheduleOneMutation();
  const { currentlyEditing: currentlyEditingShot } = useSelector(
    (state) => state.shots.manualEdits
  );

  const [pressed, setPressed] = useState(false);

  const handleScheduleTargetShot = async () => {
    await scheduleOne({ id: currentlyEditingShot });
  };

  // const handleScheduleAll = async () =>
  //   await scheduleAll({ productId: params.productId as string });

  return (
    <nav
      data-active={!!currentlyEditingShot}
      className={`fixed top-0 left-1/2 data-[active="true"]:border-gray-300  transform -translate-x-1/2 w-max mx-auto mt-10 z-10 border p-2.5 flex items-center justify-center rounded-xl shadow-md shadow-slate-900/5 bg-white`}
    >
      <div className="space-x-3 flex items-center">
        <Toggle.Root
          pressed={pressed}
          onPressedChange={setPressed}
          className={`aspect-square h-10 ${
            pressed ? 'bg-black' : 'bg-white'
          } shadow border p-2.5 rounded-full flex items-center justify-center`}
          aria-label="Toggle Twitter Post"
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.6526 3.8078H43.3995L28.6594 20.6548L46 43.5797H32.4225L21.7881 29.6759L9.61989 43.5797H2.86886L18.6349 25.56L2 3.8078H15.9222L25.5348 16.5165L36.6526 3.8078ZM34.2846 39.5414H38.0232L13.8908 7.63406H9.87892L34.2846 39.5414Z"
              fill={pressed ? 'white' : 'black'}
            />
          </svg>
        </Toggle.Root>
        <DateTimePicker />
        <Button
          size={'md'}
          className="shadow-md shadow-emerald-700/20 space-x-1.5"
          variant={'neutral.solid'}
          onClick={handleScheduleTargetShot}
          disabled={isScheduling}
        >
          <Share size={16} color="#ffffff" variant="Bulk" />
          <span className="text-white">Launch</span>
        </Button>
      </div>
    </nav>
  );
};
