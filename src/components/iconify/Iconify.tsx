import PropTypes from 'prop-types';
import { forwardRef, ForwardedRef, ReactNode } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';
import { SxProps } from '@mui/system';

// TypeScript prop types
interface IconifyProps extends BoxProps {
  icon: string;
  width?: number | string;
  sx?: SxProps;
  children?: ReactNode;
}

// ForwardRef render function with TypeScript
const Iconify = forwardRef((props: IconifyProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { icon, width = 20, sx, ...other } = props;

  return <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />;
});

Iconify.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.object,
  children: PropTypes.node,
};

// Set the displayName
Iconify.displayName = 'Iconify';

export default Iconify;
