import { ChangeEvent, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { orderBy, uniq } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { Beer, FIELD, SORT } from '../../types';
import { capitalizeFirstLetter, fetchData } from './utils';
import {
  Avatar,
  FormControl,
  InputLabel,
  List,
  ListItemAvatar,
  ListItemButton as MuiListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SportsBar from '@mui/icons-material/SportsBar';

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

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
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 0,
    itemsPerPage: 10
  });
  const [sortOrder, setSortOrder] = useState<SortDirection>(SortDirection.ASC);
  const [sortBy, setSortBy] = useState<FIELD>('name');
  const [filterByType, setFilterByType] = useState<string | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const uniqueBreweryTypes = uniq(beerList.map(({ brewery_type }: Beer) => brewery_type));

  const filteredBeerList = useMemo(() => {
    if (filterByType === 'all') {
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

  const handleSortByChange = (event: SelectChangeEvent<FIELD>): void => {
    setSortBy(event.target.value as FIELD);
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
        <FormControl sx={{ width: 200, mr: 1 }}>
          <TextField
            id="search"
            label="Search by name"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </FormControl>
        <FormControl sx={{ width: 120, mr: 1 }}>
          <InputLabel id="brewery-type-label">Brewery Type</InputLabel>
          <Select labelId="brewery-type-label" value={filterByType} onChange={handleTypeFilterChange} label="Brewery Type">
            <MenuItem value="all">All</MenuItem>
            {uniqueBreweryTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {capitalizeFirstLetter(type)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 120, mr: 1 }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              onChange={handleSortByChange}
              label="Sort By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="brewery_type">Brewery Type</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 120 }}>
            <InputLabel id="sort-order-label">Sort Order</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Sort Order"
              renderValue={(selected) => selected} 
            >
              <MenuItem value={SortDirection.ASC}>ASC</MenuItem>
              <MenuItem value={SortDirection.DESC}>DESC</MenuItem>
            </Select>
          </FormControl>
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