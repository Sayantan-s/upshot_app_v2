import { ILaunchedAtClientState } from '@client/store/types/shot';
import { format, getUnixTime, parseISO } from 'date-fns';

export const convertDateToEpoch = (selectedDate: Date) => {
  const date = parseISO(selectedDate!.toISOString());
  // const offset = selectedDate.getTimezoneOffset();
  // const UTCDate = addMinutes(date, offset);
  return getUnixTime(date);
};

export const convertEpochToDate = (epoch: number): ILaunchedAtClientState => {
  const date = new Date(epoch * 1000);
  const hours = format(date, 'HH');
  const mins = format(date, 'mm');

  return { selectedDate: date, hours, mins };
};

export const convertUTCEpochToDate = (
  epoch: number
): ILaunchedAtClientState => {
  const date = new Date(epoch * 1000);
  const hours = format(date, 'HH');
  const mins = format(date, 'mm');

  return { selectedDate: date, hours, mins };
};
