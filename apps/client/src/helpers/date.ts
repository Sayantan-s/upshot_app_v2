import { ILaunchedAtClientState } from '@client/store/types/shot';
import { format, getUnixTime, parseISO } from 'date-fns';

export const convertDateToEpoch = (selectedDate: Date) => {
  const date = parseISO(selectedDate!.toISOString());
  return getUnixTime(date);
};

export const convertEpochToDate = (epoch: number): ILaunchedAtClientState => {
  const date = new Date(epoch * 1000);
  const hours = format(date, 'hh');
  const mins = format(date, 'mm');

  return { selectedDate: date, hours, mins };
};
