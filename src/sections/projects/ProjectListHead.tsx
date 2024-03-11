import React from 'react';
// @mui
import { Box, Stack, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { TProject } from '@/types/projectTypes';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

type THeadCell = {
  id: string;
  alignRight: boolean;
  label: string;
};
type TProjectListHeadProps = {
  order: 'desc' | 'asc';
  orderBy: string;
  headLabel: THeadCell[];
  onRequestSort: (p: keyof TProject) => void;
};

export default function ProjectListHead({ order, orderBy, headLabel, onRequestSort }: TProjectListHeadProps) {

  const createSortHandler = (property: keyof TProject): React.MouseEventHandler<HTMLSpanElement> => {
    return () => {
      onRequestSort(property);
    };
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Stack>
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as keyof TProject)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                ) : null}
              </TableSortLabel>
            </Stack>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
