import { filter } from 'lodash';
import { format, parseISO } from 'date-fns';

// types
import { TTimeRecord } from '../types/projectTypes';
import { minutesToHours } from './formatTime';

export const hasAllowedRoles = (allowedRoles: string[], userRoles: string[]) => {
  let isAllowed = false;
  allowedRoles.forEach((r) => {
    if (userRoles.includes(r)) {
      isAllowed = true;
    }
  });
  return isAllowed;
};

export const formatDateToLocale = (date: string) => format(parseISO(date), 'dd-MM-yyyy');

// ************************ Table Sort ********************************************
export const descendingComparator = (a: any, b: any, orderBy: any) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order: string, orderBy: string) =>
  order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);

export const applySortFilter = (
  array: any[],
  comparator: (order: string, orderBy: string) => number,
  query: string
) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
};

// ***************************************************************

export const secondsToTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${hours}:${minutes}:${seconds}`;
};

export function sortTimeRecordsByDate(timeRecords: TTimeRecord[]): TTimeRecord[] {
  return timeRecords.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

export const updateTimeRegistrationsView = (newRecords: TTimeRecord[], actualRecords: TTimeRecord[]) => {
  return sortTimeRecordsByDate(actualRecords.concat(newRecords));
};

export const calculateTotalTime = (timeRecords: TTimeRecord[]) =>
  minutesToHours(timeRecords.reduce((sum, record) => sum + record.durationMinutes, 0));

// ******************** Validate input data for new time registration *******************************************

function isDateBetween(startDate: Date, endDate: Date, targetDate: Date) {
  return new Date(targetDate) >= new Date(startDate) && new Date(targetDate) <= new Date(endDate);
}
function isTimeDurationCorrect(duration: number) {
  return duration >= 30 && duration <= 60 * 24;
}

export const validateNewRecordInput = (
  item: { durationMinutes?: number; startTime?: Date },
  projectStartDate: Date,
  projectDeadline: Date
) =>
  item.durationMinutes &&
  item.startTime &&
  isDateBetween(projectStartDate, projectDeadline, item.startTime) &&
  isTimeDurationCorrect(item.durationMinutes);

// ***************************************************************
