import { useState, useRef, MutableRefObject } from 'react';

// @mui
import { Card, CardHeader, CardContent } from '@mui/material';
import { Timeline } from '@mui/lab';
// types
import { TTimeRecord } from '../../types/projectTypes';

// components
import TimeRegistrationDialogBox from './TimeRegistrationDialogBox';
import { TimeRecord } from './TimeRecord';

// utils
import { sortTimeRecordsByDate, updateTimeRegistrationsView, calculateTotalTime } from '../../utils/functions';

type TTimeRegistrationsProps = {
  isActive: boolean;
  list: TTimeRecord[];
  projectId: string;
  projectStartDate: Date;
  projectDeadline: Date;
};

export default function TimeRegistrations({
  isActive,
  list,
  projectId,
  projectStartDate,
  projectDeadline,
  ...other
}: TTimeRegistrationsProps) {
  const [records, setRecords] = useState(sortTimeRecordsByDate(list));

  const cardRef: MutableRefObject<null> = useRef(null);

  // const cardRef: any = useRef(null);

  const addItemsToItemList = (newRecords: TTimeRecord[]) => {
    setRecords(updateTimeRegistrationsView(records, newRecords));
  };

  return (
    <Card {...other} ref={cardRef}>
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
