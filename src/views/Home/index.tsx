import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';
import { FAVOURITE_BEERS_KEY } from './constants'

const Home = () => {
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const [favouriteList, setFavouriteList] = useState<{ [key: string]: Beer }>({});
  const [filteredBeerList, setFilteredBeerList] = useState<Beer[]>(beerList)
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchData(setBeerList);
  }, []);

  useEffect(() => {
    const initialFavouriteList = () => {
      const data = JSON.parse(localStorage.getItem(FAVOURITE_BEERS_KEY) || '{}');
      setFavouriteList(data);
    };

    initialFavouriteList();
  }, []);

  useEffect(() => {
    setFilteredBeerList(
        beerList.filter((beer: Beer) =>
          beer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
  }, [beerList, searchTerm]);

  const handleBeerSelect = (
    event: ChangeEvent<HTMLInputElement>,
    beer: Beer
  ) => {
    const newFavouriteList = { ...favouriteList };
  
    if (event.target.checked) {
      newFavouriteList[beer.id] = beer;
    } else {
      delete newFavouriteList[beer.id];
    }
  
    setFavouriteList(newFavouriteList);
    localStorage.setItem(FAVOURITE_BEERS_KEY, JSON.stringify(newFavouriteList));
  };

  const removeFavouriteBeers = () => {
    localStorage.setItem(FAVOURITE_BEERS_KEY, JSON.stringify({}));
    setFavouriteList({});
  };

  const handleReloadClick = () => {
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
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField
                  label='Search by name'
                  value={searchTerm}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                />
                <Button variant='contained' onClick={handleReloadClick}>Reload list</Button>
              </div>
              <ul className={styles.list}>
                {filteredBeerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox 
                      checked={Object.keys(favouriteList).includes(beer.id)}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleBeerSelect(event, beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Favourite beers</h3>
                <Button variant="contained" size="small" onClick={removeFavouriteBeers}>
                  Remove all beers
                </Button>
              </div>
              <ul className={styles.list}>
                {Object.values(favouriteList).map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox
                      checked={true}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleBeerSelect(event, beer)}
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!Object.values(favouriteList).length && <p>No favourite beers</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
