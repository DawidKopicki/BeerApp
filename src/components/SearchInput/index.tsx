import { FC } from 'react';
import { SearchInputProps } from '../../types';
import { FormControl, TextField } from '@mui/material';

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => (
  <FormControl sx={{ width: 200, mr: 1 }}>
    <TextField
      id="search"
      label="Search by name"
      value={value}
      onChange={onChange}
    />
  </FormControl>
);

export default SearchInput;