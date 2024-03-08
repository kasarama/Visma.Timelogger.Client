import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Grid,
  LinearProgress,
  Tooltip,
  ClickAwayListener,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { setUser, resetUser } from '../../../actions';
import { login } from '../../../utils/functions';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
LoginForm.propTypes = {
  saveUser: PropTypes.func,
  deleteUser: PropTypes.func,
};
function LoginForm({ saveUser, deleteUser }) {
  const EMPTY_STRING = '';
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({});
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);
  const [loading, setLoading] = useState(false);
  const [startLogin, setStartLogin] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [openToolTip, setOpenToolTip] = useState(false);

  const onChange = (evt) => {
    setError(EMPTY_STRING);
    setCredentials({
      ...credentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(EMPTY_STRING);
    if (!validateCredentials()) {
      setError('Provide all data');
    } else {
      setLoading(true);
      setStartLogin(true);
      setFormDisabled(true);
    }
  };

  const validateCredentials = () => {
    return credentials.userName && credentials.password;
  };
  const clearData = () => {
    setCredentials({});
    setFormDisabled(false);
    setPassword(EMPTY_STRING);
    setUsername(EMPTY_STRING);
  };

  useEffect(() => {
    if (startLogin) {
      setFormDisabled(true);

      login(credentials)
        .then((res) => {
          navigate('/');
          const user = { roles: res.data.roles, userName: res.data.userName, token: res.data.token };
          setFormDisabled(true);
          saveUser(user);
        })
        .catch((err) => {
          setLoading(false);
          const status = err.response && err.response.status ? err.response.status : 0;

          deleteUser();
          if (status === 400) {
            setError('Invalid username name or password');
          } else if (status === 403) {
            setError('You must create a new password to activate your profile');
          } else {
            setError('Network error has occurred: could not login');
          }
          clearData();
        });
    }
    return function cleanUp() {
      setStartLogin(false);
      setLoading(false);
    };
  }, [startLogin]);

  const handleTooltipClose = () => {
    setOpenToolTip(false);
  };

  const handleTooltipOpen = () => {
    setOpenToolTip(true);
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField
          disabled={isFormDisabled}
          type="text"
          label="User Name"
          onChange={(e) => {
            onChange(e);
            setUsername(e.target.value);
          }}
          value={userName}
          id="userName"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          disabled={isFormDisabled}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Password"
          id="password"
          onChange={(e) => {
            onChange(e);
            setPassword(e.target.value);
          }}
          value={password}
          required
          sx={{ mb: 2 }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={openToolTip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="tip: password=username"
          >
            <Link variant="subtitle2" underline="hover" onClick={handleTooltipOpen}>
              Forgot password?
            </Link>
          </Tooltip>
        </ClickAwayListener>
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
        {isFormDisabled ? <LinearProgress /> : ''}
        <LoadingButton
          loading={loading}
          disabled={isFormDisabled}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </LoadingButton>
      </Stack>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(setUser(user)),
  deleteUser: () => dispatch(resetUser()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
