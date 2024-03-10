import { Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

export default StyledRoot;
