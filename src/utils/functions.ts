import { filter } from 'lodash';

// types
import { TProject, TTimeRecord } from '../types/projectTypes';
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

// ************************ Table Sort ********************************************
const descendingComparator = (a: TProject, b: TProject, orderBy: keyof TProject): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order: 'asc' | 'desc', orderBy: keyof TProject): ((a: TProject, b: TProject) => number) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

export const applySortFilter = (
  array: TProject[],
  comparator: (a: TProject, b: TProject) => number,
  query: string
): TProject[] => {
  const stabilizedThis = array.map((el, index) => ({ value: el, index }));
  stabilizedThis.sort((a, b) => comparator(a.value, b.value));

  const sortedArray = stabilizedThis.map((el) => el.value);

  if (query) {
    return filter(sortedArray, (item: TProject) => item.name.toLowerCase().includes(query.toLowerCase()));
  }

  return sortedArray;
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
  return timeRecords.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
}

export const updateTimeRegistrationsView = (newRecords: TTimeRecord[], actualRecords: TTimeRecord[]) =>
  sortTimeRecordsByDate(actualRecords.concat(newRecords));

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
