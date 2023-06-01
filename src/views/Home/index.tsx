import { ChangeEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import { styled } from '@mui/system';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { FAVOURITE_BEERS_KEY } from './constants';

const List = styled('ul')({
  listStyle: 'none',
});

const ListContainer = styled('div')({
  padding: '20px',
  marginBottom: '20px',
  background: '#fff',
});

const ListHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '40px',
});

const Home = () => {
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const [favouriteList, setFavouriteList] = useState<{ [key: string]: Beer }>({});
  const [filteredBeerList, setFilteredBeerList] = useState<Beer[]>(beerList);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect((): void => {
    fetchData(setBeerList);
  }, []);

  useEffect((): void => {
    const initialFavouriteList = () => {
      const data = JSON.parse(localStorage.getItem(FAVOURITE_BEERS_KEY) || '{}');
      setFavouriteList(data);
    };

    initialFavouriteList();
  }, []);

  useEffect((): void => {
    setFilteredBeerList(
      beerList.filter((beer: Beer) => beer.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [beerList, searchTerm]);

  const handleBeerSelect = (event: ChangeEvent<HTMLInputElement>, beer: Beer): void => {
    const newFavouriteList = { ...favouriteList };

    if (event.target.checked) {
      newFavouriteList[beer.id] = beer;
    } else {
      delete newFavouriteList[beer.id];
    }

    setFavouriteList(newFavouriteList);
    localStorage.setItem(FAVOURITE_BEERS_KEY, JSON.stringify(newFavouriteList));
  };

  const removeFavouriteBeers = (): void => {
    localStorage.setItem(FAVOURITE_BEERS_KEY, JSON.stringify({}));
    setFavouriteList({});
  };

  const handleReloadClick = (): void => {
    fetchData((updatedBeerList: Beer[]) => {
      const filteredList = updatedBeerList.filter(
        (beer: Beer) => !Object.keys(favouriteList).includes(beer.id)
      );
      setBeerList(filteredList);
    });
    setSearchTerm('');
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <ListContainer>
              <ListHeader>
                <TextField
                  label="Search by name"
                  value={searchTerm}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(event.target.value)
                  }
                />
                <Button variant="contained" onClick={handleReloadClick}>
                  Reload list
                </Button>
              </ListHeader>
              <List>
                {filteredBeerList.map((beer) => (
                  <li key={beer.id}>
                    <Checkbox
                      checked={Object.keys(favouriteList).includes(beer.id)}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleBeerSelect(event, beer)
                      }
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </List>
            </ListContainer>
          </Paper>

          <Paper>
            <ListContainer>
              <ListHeader>
                <h3>Favourite beers</h3>
                <Button variant="contained" size="small" onClick={removeFavouriteBeers}>
                  Remove all beers
                </Button>
              </ListHeader>
              <List>
                {Object.values(favouriteList).map((beer) => (
                  <li key={beer.id}>
                    <Checkbox
                      checked={true}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleBeerSelect(event, beer)
                      }
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!Object.values(favouriteList).length && <p>No favourite beers</p>}
              </List>
            </ListContainer>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
