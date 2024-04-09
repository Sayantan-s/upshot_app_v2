import {
  ILaunchedAtClientState,
  TimeConvention,
} from '@client/store/types/shot';
import {
  addHours,
  addMinutes,
  format,
  getHours,
  getUnixTime,
  parseISO,
} from 'date-fns';

interface ITime {
  hours: string;
  mins: string;
}

export const convertDateToEpoch = (
  selectedDate: Date,
  timeConvention: TimeConvention,
  time: ITime
) => {
  let date = parseISO(selectedDate!.toISOString());
  const hrs =
    timeConvention === TimeConvention.PM ? +time.hours + 12 : +time.hours;
  const mins = +time.mins;
  date = addHours(date, hrs);
  date = addMinutes(date, mins);
  return getUnixTime(date);
};

export const convertEpochToDate = (epoch: number): ILaunchedAtClientState => {
  const date = new Date(epoch * 1000);
  const hours = format(date, 'hh');
  const mins = format(date, 'mm');

  const timeConvention =
    getHours(date) >= 12 ? TimeConvention.PM : TimeConvention.AM;

  return { selectedDate: date, hours, mins, timeConvention };
};
