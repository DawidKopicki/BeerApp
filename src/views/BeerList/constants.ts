enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

enum Filter {
  ALL = 'all'
}

const sortByOptions = [
  { value: 'name', label: 'Name' },
  { value: 'brewery_type', label: 'Brewery Type' },
];

const sortDirectionOptions = [
  { value: SortDirection.ASC, label: 'ASC' },
  { value: SortDirection.DESC, label: 'DESC' },
];

export { Filter, SortDirection, sortDirectionOptions, sortByOptions };