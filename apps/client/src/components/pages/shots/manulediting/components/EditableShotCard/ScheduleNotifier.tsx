import { useSelector } from '@client/store';
import { ShotStatus } from '@client/store/types/shot';
import { format } from 'date-fns';
import { Calendar } from 'iconsax-react';
import { FC } from 'react';
import { IScheduleNotifierProps } from './type';

export const ScheduleNotifier: FC<IScheduleNotifierProps> = ({
  shotId,
  disabled,
}) => {
  const shot = useSelector(
    (state) => state.shots.manualEdits.shots.entities[shotId]
  );

  return shot?.launchedAt?.selectedDate ? (
    <div
      className={`mt-4 flex items-center space-x-2 px-4 py-2 ${
        shot.status === ShotStatus.IDLE
          ? 'bg-emerald-100'
          : shot?.status === ShotStatus.SCHEDULED
          ? 'bg-gray-100'
          : 'bg-sky-100'
      } w-max rounded-full mx-auto ${
        disabled
          ? 'filter grayscale disabled:cursor-not-allowed opacity-40'
          : ''
      }`}
    >
      <p className="text-xs flex space-x-1">
        <Calendar
          variant="Bulk"
          size={15}
          color={
            shot?.status === ShotStatus.IDLE
              ? '#047857'
              : shot?.status === ShotStatus.SCHEDULED
              ? '#374151'
              : '#0369a1'
          }
        />{' '}
        <span
          className={`${
            shot?.status === ShotStatus.IDLE
              ? 'text-emerald-700'
              : shot?.status === ShotStatus.SCHEDULED
              ? 'text-gray-700'
              : 'text-sky-700'
          } text-xs`}
        >
          {shot?.status === ShotStatus.IDLE
            ? 'Schedule time'
            : shot?.status === ShotStatus.SCHEDULED
            ? 'Scheduled at'
            : 'Posted time'}
        </span>
      </p>
      <p className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
        {format(shot.launchedAt.selectedDate, 'do MMMM yyyy')}{' '}
        <span className="text-xs ml-2">
          {shot.launchedAt.hours}:{shot.launchedAt.mins}{' '}
          {shot.launchedAt.timeConvention}
        </span>
      </p>
    </div>
  ) : (
    <div className="mt-4 flex opacity-50 items-center space-x-2 px-4 py-2 bg-white border w-max rounded-full mx-auto">
      <p className="text-xs flex space-x-1">
        <Calendar variant="Bulk" size={15} color="#f43f5e" />{' '}
        <span className="text-rose-500 stroke-rose-500 text-xs">
          Schedule time
        </span>
      </p>
      <p className="bg-white shadow px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
        Your schedule date
        <span className="text-xs ml-2">AM/PM</span>
      </p>
    </div>
  );
};
