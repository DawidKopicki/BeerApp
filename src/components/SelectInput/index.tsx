import { FC } from 'react';
import { SelectInputProps } from '../../types';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

const SelectInput: FC<SelectInputProps> = ({ label, value, onChange, options }) => (
  <FormControl sx={{ width: 120, mr: 1 }}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select labelId={`${label}-label`} value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
          {option.label}
          </MenuItem>
        ))}
      </Select>
  </FormControl>
);

export default SelectInput;