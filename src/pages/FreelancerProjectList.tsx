import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// @mui
import {
  Button,
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { getComparator, applySortFilter } from '../utils/functions';

// sections
import { ProjectListHead, ProjectListToolbar } from '../sections/projects';
import { TProject } from '../types/projectTypes';

// utils
import { formatDateToLocale } from '../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Project Name', alignRight: false },
  { id: 'deadline', label: 'Deadline', alignRight: false },
  { id: 'startTime', label: 'Start date', alignRight: false },
  { id: 'isActive', label: 'Status', alignRight: false },
];

// ----------------------------------------------------------------------

type TFreelancerProjectListProps = {
  data: TProject[];
};

export default function FreelancerProjectList({ data }: TFreelancerProjectListProps) {
  const EMPTY_STRING = '';

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'desc' | 'asc'>('asc');

  const [orderBy, setOrderBy] = useState<keyof TProject>('deadline');

  const [filterName, setFilterName] = useState(EMPTY_STRING);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [hideInactiveProjects, setHideInactiveProjects] = useState(false);

  const selected: string[] = [];

  const navigate = useNavigate();

  const handleRequestSort = (property: keyof TProject) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredItems = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredItems.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Projects | Visma.Timelogger </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
          {hideInactiveProjects ? (
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => {
                setHideInactiveProjects(false);
              }}
            >
              Show Inactive Projects
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:minus-fill" />}
              onClick={() => {
                setHideInactiveProjects(true);
              }}
            >
              Hide Inactive Projects
            </Button>
          )}
        </Stack>

        <Card>
          <ProjectListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder="Search project name..."
          />

          <Scrollbar sx={{}}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProjectListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, deadline, startTime, isActive } = row;
                    const selectedItem = selected.indexOf(name) !== -1;

                    return hideInactiveProjects && !isActive ? (
                      ''
                    ) : (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedItem}
                        onClick={() => navigate(`/freelancer_projects/${id}`)}
                      >
                        <TableCell component="th" scope="row" padding="none" sx={{ paddingLeft: 2 }}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{formatDateToLocale(deadline)}</TableCell>
                        <TableCell align="center">{formatDateToLocale(startTime)}</TableCell>
                        <TableCell align="center">{isActive ? 'Active' : 'Inactive'}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={filteredItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
