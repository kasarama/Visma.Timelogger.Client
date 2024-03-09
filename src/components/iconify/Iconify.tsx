import React, { forwardRef } from 'react';

// icons
import { Icon, IconProps } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';

type TIconifyProps = IconProps & {
  sx?: BoxProps['sx'];
  width?: number | string;
  icon: string;
};

const Iconify = forwardRef(({ icon, width = 20, sx }: TIconifyProps, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} />
));

export default Iconify;
