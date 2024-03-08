import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { MenuItem, IconButton, Popover } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// components
import { logout } from '../../../utils/functions';
import { resetUser } from '../../../actions';

// ----------------------------------------------------------------------

LogOutPopover.propTypes = {
  removeUser: PropTypes.func,
};
function LogOutPopover({ removeUser }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout()
      .then(() => {
        setOpen(false);
        removeUser();
      })
      .catch(() => removeUser());
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.8),
            },
          }),
        }}
      >
        <LogoutIcon fontSize="large" color="primary" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch(resetUser()),
});

export default connect(null, mapDispatchToProps)(LogOutPopover);
