import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Grid, Stack, Button, Popover, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { postCreateTimeRecord } from '../../utils/functions';
import Iconify from '../../components/iconify';

export default function TimeRegistrationDialogBox({
  addTimeRecordToRegistrationList,
  cardRef,
  projectId,
  projectStartDate,
  projectDeadline,
}) {
  const EMPTY_STRING = '';
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startAddItem, setStartAddItem] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);
  const [itemData, setItemData] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpen = (event) => {
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

  const onChange = (evt) => {
    setError(EMPTY_STRING);

    setItemData({
      ...itemData,
      [evt.target.id]: evt.target.value,
    });
  };
  function isDateBetween(startDate, endDate, targetDate) {
    return new Date(targetDate) >= new Date(startDate) && new Date(targetDate) <= new Date(endDate);
  }
  function isTimeDurationCorrect(duration) {
    return duration >= 30 && duration <= 60 * 24;
  }

  const validateInput = (item) =>
    item.durationMinutes &&
    item.startTime &&
    isDateBetween(projectStartDate, projectDeadline, item.startTime) &&
    isTimeDurationCorrect(item.durationMinutes);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInput(itemData)) {
      setError('Provided data is incorrect');
    } else {
      setLoading(true);
      setStartAddItem(true);
      setFormDisabled(true);
    }
  };

  useEffect(() => {
    if (startAddItem) {
      const body = { projectId, ...itemData };
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
            onChange={(e) => {
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
            onChange={(e) => {
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
