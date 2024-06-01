import { Button } from '@client/components/ui';
import { useModal } from '@client/context/ModalSystem';
import { useSelector } from '@client/store';
import { shotsApi } from '@client/store/services/shot';
import { ShotStatus } from '@client/store/types/shot';
import * as Toggle from '@radix-ui/react-toggle';
import { addHours, addMinutes, getUnixTime } from 'date-fns';
import { Share } from 'iconsax-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { DateTimePicker } from './DateTimePicker';

export const Toolbar = () => {
  const [scheduleAll, { isLoading: isSchedulingAll }] =
    shotsApi.useScheduleAllMutation();
  const { shots } = useSelector((state) => state.shots.manualEdits);
  const params = useParams();
  const modal = useModal({ isLoading: isSchedulingAll });
  const [pressed, setPressed] = useState(false);

  const handleOpenSaveAll = () => {
    const isAvailableForLaunchAll = shots.ids.every((id) => {
      const shot = shots.entities[id];
      if (shot?.status === ShotStatus.IDLE && shot.launchedAt?.selectedDate) {
        const launchDate = addMinutes(
          addHours(shot.launchedAt.selectedDate, +shot.launchedAt.hours),
          +shot.launchedAt.mins
        );
        return getUnixTime(launchDate) > Math.floor(Date.now() / 1000);
      }
      return false;
    });
    if (!isAvailableForLaunchAll) {
      toast.info('Shot Status Mismatch', {
        description:
          'All your shots might not have the same idle status with a scheduled date!',
      });
      return;
    }
    modal.create({
      variant: 'info',
      heading: `Are you sure want to schedule all the shots according to their
              schedule time?`,
      body: `Once the shots have been scheduled, any changes or reversals will
              necessitate additional credits. Please proceed only after
              confirming your final selections!`,
      confirmationBtnText: `Let's do this!`,
      onConfirm: handleScheduleAll,
    });
  };

  const handleScheduleAll = async () =>
    await scheduleAll({ productId: params.productId as string });

  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-max mx-auto mt-10 z-10 border p-2.5 flex items-center justify-center rounded-xl shadow-md shadow-slate-900/5 bg-white`}
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
          onClick={handleOpenSaveAll}
        >
          <Share size={16} color="#ffffff" variant="Bulk" />
          <span className="text-white">Launch All</span>
        </Button>
      </div>
    </nav>
  );
};
