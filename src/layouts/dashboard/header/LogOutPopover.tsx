import { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// @mui
import { alpha } from '@mui/material/styles';
import { MenuItem, IconButton, Popover } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// components
import { logout } from '../../../utils/apiFacade';
import { resetUser } from '../../../actions';

// ----------------------------------------------------------------------

function LogOutPopover({ removeUser }: { removeUser: () => void }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleLogout = () => {
    logout()
      .then(() => {
        setAnchorEl(null);
        removeUser();
      })
      .catch(() => removeUser());
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
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
        id={id}
        open={Boolean(open)}
        anchorEl={anchorEl}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeUser: () => dispatch(resetUser()),
});

export default connect(null, mapDispatchToProps)(LogOutPopover);
