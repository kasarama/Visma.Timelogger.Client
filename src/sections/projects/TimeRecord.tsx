import React from 'react';

// @mui
import { Typography } from '@mui/material';
import { TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

// utils
import { fDate, minutesToHours } from '../../utils/formatTime';

// types
import { TTimeRecord } from '../../types/projectTypes';

type TTimeRecordProps = {
  item: TTimeRecord;
  isLast: boolean;
  isActive: boolean;
};
export const TimeRecord = ({ item, isLast, isActive }: TTimeRecordProps) => {
  const { id, durationMinutes, startTime } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={isActive ? 'success' : 'primary'} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{fDate(startTime)}</Typography>
        <Typography variant="h6"> {minutesToHours(durationMinutes)}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          id: {id}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
