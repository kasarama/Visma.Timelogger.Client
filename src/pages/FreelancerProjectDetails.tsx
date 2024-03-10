import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Stack, Link, Typography, Grid, Container } from '@mui/material';

//types
import { TProject } from '../types/projectTypes';

import { formatDateToLocale } from '../utils/formatTime';
import { TimeRegistrations } from '../sections/projects';

export default function FreelancerProjectDetails({ data }: { data: TProject }) {
  return (
    <>
      <Helmet>
        <title> Project Overview | Visma-Timelogger </title>
      </Helmet>

      <Container maxWidth="xl" key={data.id}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Project name: {data.name}
        </Typography>

        <Grid item xs={12} sm={6} md={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
              <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                customer: {data.customerId}
              </Link>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap={false}>
                id: {data.id}
              </Typography>
            </Box>

            <Box sx={{ minWidth: 240, flexGrow: 1 }}>
              <Typography variant="body1" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary', textAlign: 'right' }}>
                Start: {formatDateToLocale(data.startTime)}
              </Typography>
              <Typography variant="body1" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary', textAlign: 'right' }}>
                End: {formatDateToLocale(data.deadline)}
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TimeRegistrations
            list={data.timeRegistrations}
            isActive={data.isActive}
            projectId={data.id}
            projectStartDate={new Date(data.startTime)}
            projectDeadline={new Date(data.deadline)}
          />
        </Grid>
      </Container>
    </>
  );
}
