import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';
import { SAVED_BEERS_KEY } from './constants'

const Home = () => {
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const [savedList, setSavedList] = useState<{ [key: string]: Beer }>({});
  const [filteredBeerList, setFilteredBeerList] = useState<Beer[]>(beerList)
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchData(setBeerList);
  }, []);

  useEffect(() => {
    const initialSavedList = () => {
      const data = JSON.parse(localStorage.getItem(SAVED_BEERS_KEY) || '{}');
      setSavedList(data);
    };

    initialSavedList();
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
    const newSavedList = { ...savedList };
  
    if (event.target.checked) {
      newSavedList[beer.id] = beer;
    } else {
      delete newSavedList[beer.id];
    }
  
    setSavedList(newSavedList);
    localStorage.setItem(SAVED_BEERS_KEY, JSON.stringify(newSavedList));
  };

  const removeSavedBeers = () => {
    localStorage.setItem(SAVED_BEERS_KEY, JSON.stringify({}));
    setSavedList({});
  };

  const handleReloadClick = () => {
    fetchData((updatedBeerList: Beer[]) => {
      const filteredList = updatedBeerList.filter(
        (beer: Beer) => !Object.keys(savedList).includes(beer.id)
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
                      checked={Object.keys(savedList).includes(beer.id)}
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
                <Button variant="contained" size="small" onClick={removeSavedBeers}>
                  Remove all beers
                </Button>
              </div>
              <ul className={styles.list}>
                {Object.values(savedList).map((beer, index) => (
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
                {!Object.values(savedList).length && <p>No favourite beers</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
