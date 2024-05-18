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
          className="aspect-square h-10 bg-[#1D9BF020] p-2.5 rounded-full flex items-center justify-center"
          aria-label="Toggle Twitter Post"
        >
          <svg
            width={20}
            viewBox="0 0 176 144"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M156.671 36.2047C156.777 37.7365 156.777 39.2682 156.777 40.8141C156.777 87.9177 120.918 142.242 55.3483 142.242V142.214C35.9789 142.242 17.0118 136.694 0.705933 126.233C3.5224 126.572 6.35299 126.741 9.19064 126.748C25.2424 126.762 40.8353 121.376 53.4636 111.459C38.2095 111.169 24.833 101.224 20.16 86.7035C25.5036 87.7341 31.0095 87.5224 36.2542 86.0894C19.6236 82.7294 7.65887 68.1176 7.65887 51.1482C7.65887 50.9929 7.65887 50.8447 7.65887 50.6965C12.6142 53.4565 18.1624 54.9882 23.8377 55.1576C8.17417 44.6894 3.34593 23.8518 12.8048 7.56C30.9036 29.8306 57.6071 43.3694 86.273 44.8024C83.4 32.4212 87.3248 19.4471 96.5859 10.7435C110.944 -2.75294 133.525 -2.06118 147.021 12.2894C155.005 10.7153 162.657 7.78588 169.659 3.63529C166.998 11.8871 161.428 18.8965 153.988 23.3506C161.054 22.5176 167.958 20.6259 174.459 17.7388C169.673 24.9106 163.645 31.1576 156.671 36.2047Z"
              fill={pressed ? '#1D9BF0' : '#1D9BF080'}
              {...(pressed ? {} : { stroke: 'white', strokeWidth: 10 })}
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
