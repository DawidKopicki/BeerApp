import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { capitalizeFirstLetter, fetchData } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Beer[]>([]);

  useEffect((): void => {
    fetchData(setBeerList);
  }, []);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
          <List>
            {beerList.map(({ id, name, brewery_type}) => (
              <ListItemButton key={id} onClick={() => onBeerClick(id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={capitalizeFirstLetter(brewery_type)} />
              </ListItemButton>
            ))}
          </List>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
