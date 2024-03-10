import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, SxProps, Theme } from '@mui/material';
// ----------------------------------------------------------------------

type TLogoProps = {
  disabledLink: boolean;
  sx?: SxProps<Theme>;
};
const Logo = forwardRef(({ disabledLink = false, sx }: TLogoProps, ref) => {
  const logo = (
    <Box ref={ref} component="img" src="/assets/visma.png" sx={{ width: 60, height: 60, cursor: 'pointer', ...sx }} />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.displayName = 'Logo';
export default Logo;
