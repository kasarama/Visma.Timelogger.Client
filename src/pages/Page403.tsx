import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <>
      <Helmet>
        <title> 403 Access Denied | Visma.Timelogger </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Access denied!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>Sorry, we couldn’t show the page you’re looking for.</Typography>

          <Box component="img" src="/assets/illustrations/403.png" sx={{ my: { xs: 5, sm: 10 } }} />

          {/* <Button to="/login" size="large" variant="contained" component={RouterLink}>
            Login
          </Button> */}
        </StyledContent>
      </Container>
    </>
  );
}
