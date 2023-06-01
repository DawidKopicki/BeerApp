type SelectOption = {
  value: string;
  label: string;
};

type SelectInputProps = {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: SelectOption[];
  renderValue?: (selected: string) => any;
};

type SearchInputProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type PaginationConfig = {
  currentPage: number;
  itemsPerPage: number;
}

export type { SelectOption, SelectInputProps, SearchInputProps, PaginationConfig };