import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { orderBy, uniq } from 'lodash';
import { useNavigate } from 'react-router-dom';
import SelectInput from '../../components/SelectInput';
import SearchInput from '../../components/SearchInput';
import { Filter, SortDirection, sortByOptions, sortDirectionOptions } from './constants';
import { Beer, FIELD, SORT, PaginationConfig } from '../../types';
import { capitalizeFirstLetter, fetchData } from './utils';
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton as MuiListItemButton,
  ListItemText,
  SelectChangeEvent,
  TablePagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsBar from '@mui/icons-material/SportsBar';

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  '&:hover': {
    '& .avatar': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    currentPage: 0,
    itemsPerPage: 10
  });
  const [sortOrder, setSortOrder] = useState<SortDirection>(SortDirection.ASC);
  const [sortBy, setSortBy] = useState<FIELD | string>('name');
  const [filterByType, setFilterByType] = useState<string | Filter.ALL>(Filter.ALL);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const uniqueBreweryTypes = uniq(beerList.map(({ brewery_type }: Beer) => brewery_type));

  const filteredBeerList = useMemo(() => {
    if (filterByType === Filter.ALL) {
      return beerList;
    } else {
      return beerList.filter(({ brewery_type }: Beer) => brewery_type === filterByType);
    }
  }, [beerList, filterByType]);

  const searchFilteredBeerList = useMemo(() => {
    if (searchTerm === '') {
      return filteredBeerList;
    } else {
      return filteredBeerList.filter(({ name }: Beer) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [filteredBeerList, searchTerm]);

  const calculateModifiedBeerList = useCallback((): Beer[] => {
    const { currentPage, itemsPerPage } = paginationConfig
    const sortedList = orderBy(searchFilteredBeerList, [sortBy], [sortOrder.toLowerCase() as SORT]);

    return sortedList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  }, [searchFilteredBeerList, paginationConfig, sortOrder, sortBy]);

  useEffect((): void => {
    fetchData(setBeerList);
  }, []);

  const modifiedBeerList = calculateModifiedBeerList();

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, currentPage: number): void => {
    setPaginationConfig((prevConfig) => ({
      ...prevConfig,
      currentPage
    }));
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setPaginationConfig((prevConfig) => ({
      ...prevConfig,
      itemsPerPage: +event.target.value
    }));
  };

  const handleSortOrderChange = (): void => {
    setSortOrder((prevOrder) => (prevOrder === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC));
  };

  const handleSortByChange = (event: SelectChangeEvent<FIELD | string>): void => {
    setSortBy(event.target.value);
  };

  const handleTypeFilterChange = (event: SelectChangeEvent<string>): void => {
    setFilterByType(event.target.value);
    setPaginationConfig((prevConfig) => ({
      ...prevConfig,
      currentPage: 0,
    }));
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
         <SearchInput value={searchTerm} onChange={handleSearchTermChange} />

          <SelectInput
            label="Brewery Type"
            value={filterByType}
            onChange={handleTypeFilterChange}
            options={[
              { value: Filter.ALL, label: 'All' },
              ...uniqueBreweryTypes.map((type) => ({ value: type, label: capitalizeFirstLetter(type) })),
            ]}
          />

          <SelectInput
            label="Sort By"
            value={sortBy}
            onChange={handleSortByChange}
            options={sortByOptions}
          />

          <SelectInput
            label="Sort Order"
            value={sortOrder}
            onChange={handleSortOrderChange}
            options={sortDirectionOptions}
            renderValue={(selected) => selected}
          />
          <List>
            {modifiedBeerList.map(({ id, name, brewery_type }) => (
              <ListItemButton key={id} onClick={() => onBeerClick(id)}>
                <ListItemAvatar>
                  <Avatar className="avatar">
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={capitalizeFirstLetter(brewery_type)} />
              </ListItemButton>
            ))}
          </List>
          <TablePagination
            component="div"
            count={searchFilteredBeerList.length}
            page={paginationConfig.currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={paginationConfig.itemsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </main>
      </section>
    </article>
  );
};

export default BeerList;