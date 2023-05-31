type TYPE =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

type SORT = 'asc' | 'desc';

type FIELD = 'name' | 'brewery_type';

export type { FIELD, SORT, TYPE };
