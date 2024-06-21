import { ILaunchedAtClientState } from '@client/store/types/shot';
import {
  differenceInHours,
  differenceInMinutes,
  format,
  getUnixTime,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';

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

export const formatTimeDifference = (date: Date) => {
  const now = new Date();

  if (differenceInMinutes(now, date) < 1) {
    return 'just now';
  }

  if (differenceInMinutes(now, date) < 60) {
    return `${differenceInMinutes(now, date)} m ago`;
  }

  if (differenceInHours(now, date) < 24) {
    return `${differenceInHours(now, date)} h ago`;
  }

  if (isToday(date)) {
    return 'today';
  }

  if (isYesterday(date)) {
    return 'yesterday';
  }

  return format(date, 'MMM dd, yyyy');
};
