import { useSelector } from '@client/store';
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

  const hours = parseInt(shot!.launchedAt!.hours);

  console.log(shot?.launchedAt);

  return shot?.launchedAt?.selectedDate ? (
    <div
      className={`mt-4 flex items-center space-x-2 px-4 py-2 bg-emerald-100 w-max rounded-full mx-auto ${
        disabled
          ? 'filter grayscale disabled:cursor-not-allowed opacity-40'
          : ''
      }`}
    >
      <p className="text-xs flex space-x-1">
        <Calendar variant="Bulk" size={15} color={'#047857'} />{' '}
        <span className={`text-emerald-700 text-xs`}>Schedule time</span>
      </p>
      <p className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
        {format(shot.launchedAt.selectedDate, 'do MMMM yyyy')}{' '}
        <span className="text-xs ml-2">
          {(hours > 12 ? hours - 12 : hours) || 'HH'}:
          {shot.launchedAt.mins || 'MM'} {hours > 12 ? 'PM' : 'AM'}
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
      <p className="bg-gray-200/70 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700">
        Your schedule date
        <span className="text-xs ml-2">AM/PM</span>
      </p>
    </div>
  );
};
