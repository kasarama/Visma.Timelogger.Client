import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Grid, Stack, Button, Popover, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { postCreateTimeRecord } from '../../utils/api';
import Iconify from '../../components/iconify';

// types
import { TCreateTimeRecordRequest, TTimeRecord } from '../../types/projectTypes';

// utils
import { validateNewRecordInput } from '../../utils/functions';

type TTimeRegistrationDialogBoxProps = {
  addTimeRecordToRegistrationList: (record: TTimeRecord[]) => void;
  cardRef: any;
  projectId: string;
  projectStartDate: Date;
  projectDeadline: Date;
};
export default function TimeRegistrationDialogBox({
  addTimeRecordToRegistrationList,
  cardRef,
  projectId,
  projectStartDate,
  projectDeadline,
}: TTimeRegistrationDialogBoxProps) {
  const EMPTY_STRING = '';
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startAddItem, setStartAddItem] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);
  const [itemData, setItemData] = useState<{ durationMinutes?: number; startTime?: Date }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpen = () => {
    setAnchorEl(cardRef.current);
    setIsSuccess(false);
    setFormDisabled(false);
  };

  const handleClose = () => {
    setError(EMPTY_STRING);
    if (!loading) {
      setAnchorEl(null);
    }
  };

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setError(EMPTY_STRING);

    setItemData({
      ...itemData,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validateNewRecordInput(itemData, projectStartDate, projectDeadline)) {
      setError('Provided data is incorrect');
    } else {
      setLoading(true);
      setStartAddItem(true);
      setFormDisabled(true);
    }
  };

  useEffect(() => {
    if (startAddItem) {
      const now = new Date();
      const body: TCreateTimeRecordRequest = {
        projectId,
        durationMinutes: itemData.durationMinutes ? itemData.durationMinutes : 0,
        startTime: itemData.startTime ? itemData.startTime : new Date(now.getTime() + 2 * 86400000),
      };
      postCreateTimeRecord(body)
        .then(() => {
          setFormDisabled(true);
          setIsSuccess(true);
          addTimeRecordToRegistrationList([{ id: projectId, ...body }]);
        })
        .catch((err) => {
          setLoading(false);
          const status = err.response && err.response.status ? err.response.status : 0;
          switch (status) {
            case 400: {
              setError('Incorrect values');
              break;
            }
            case 401: {
              navigate('/401');
              return;
            }
            default:
              setError('Network error has occurred: could not add item');
          }

          setFormDisabled(false);
        });
    }
    return function cleanUp() {
      setStartAddItem(false);
      setLoading(false);
    };
  }, [startAddItem]);

  return (
    <>
      <Button variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
        Add Time
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Stack spacing={3}>
          <TextField
            size={'small'}
            type="date"
            disabled={isFormDisabled}
            id="startTime"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e);
            }}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            size={'small'}
            disabled={isFormDisabled}
            type="number"
            label="Time"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e);
            }}
            id="durationMinutes"
            required
            sx={{ mb: 2 }}
          />
          {isSuccess ? (
            <>
              <Grid item xs color={'blue'}>
                Time Registration succeeded!
              </Grid>
              <LoadingButton
                loading={loading}
                fullWidth
                size="medium"
                type="submit"
                variant="contained"
                color="success"
                onClick={handleClose}
              >
                OK
              </LoadingButton>
            </>
          ) : (
            <Button
              disabled={isFormDisabled}
              fullWidth
              size="medium"
              type="submit"
              variant="contained"
              color="success"
              onClick={handleSubmit}
            >
              Send
            </Button>
          )}
        </Stack>
        <Stack>
          {error ? (
            <Grid container>
              <Grid item xs color={'red'}>
                {error}
              </Grid>
            </Grid>
          ) : (
            EMPTY_STRING
          )}
        </Stack>
      </Popover>
    </>
  );
}
