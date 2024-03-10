import { Tooltip, IconButton, InputAdornment } from '@mui/material';
// component
import Iconify from '../../components/iconify';
import StyledRoot from './StyledRoot';
import StyledSearch from './StyledSearch';

// ----------------------------------------------------------------------

type TProjectListToolbarProps = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  placeholder: string;
};

export default function ProjectListToolbar({ filterName, onFilterName, placeholder }: TProjectListToolbarProps) {
  return (
    <StyledRoot>
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
}
