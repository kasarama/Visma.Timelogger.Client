import { useState, useRef } from 'react';

// @mui
import PropTypes from 'prop-types';
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';

// components
import TimeRegistrationDialogBox from './TimeRegistrationDialogBox';

// utils
import { fDate, minutesToHours } from '../../utils/formatTime';

TimeRegistrations.propTypes = {
  isActive: PropTypes.bool,
  list: PropTypes.array.isRequired,
};

function sortTimeRecordsByDate(timeRecords) {
  return timeRecords.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
}

export default function TimeRegistrations({ isActive, list, projectId, projectStartDate, projectDeadline, ...other }) {
  const [records, setRecords] = useState(sortTimeRecordsByDate(list));
  const cardRef = useRef(null);

  const addItemsToItemList = (items) => {
    let tmp = records;
    tmp = tmp.concat(items);
    setRecords(sortTimeRecordsByDate(tmp));
  };

  const calculateTotalTime = (timeRecords) =>
    minutesToHours(timeRecords.reduce((sum, record) => sum + record.durationMinutes, 0));

  return (
    <Card ref={cardRef} {...other}>
      <CardHeader title={'Time Registrations'} subheader={`Total time: ${calculateTotalTime(records)}`} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        {isActive ? (
          <TimeRegistrationDialogBox
            addTimeRecordToRegistrationList={addItemsToItemList}
            cardRef={cardRef}
            projectId={projectId}
            projectStartDate={projectStartDate}
            projectDeadline={projectDeadline}
          />
        ) : (
          ''
        )}
        <Timeline>
          {records.map((item, index) => (
            <TimeRecord key={item.id} item={item} isLast={index === list.length - 1} isActive={isActive} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

TimeRecord.propTypes = {
  isLast: PropTypes.bool,
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    startTime: PropTypes.string,
    durationMinutes: PropTypes.number,
    id: PropTypes.string,
  }),
};

function TimeRecord({ item, isLast, isActive }) {
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
}
