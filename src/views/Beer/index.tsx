import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import { Button, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import BeerMap from '../../components/BeerMap';

const BeerContainer = styled('article')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const BeerSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(2),
}));

const BeerMain = styled('main')({
  display: 'flex',
  flexDirection: 'column',
});

const BeerPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const BeerTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const BeerType = styled(Typography)(({ theme }) => ({
  textTransform: 'capitalize',
  marginBottom: theme.spacing(1),
}));

const BeerAddress = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));

const BeerButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  useEffect(() => {
    fetchData(setBeer, id);
  }, [id]);

  if (!beer) return null;

  const { name, longitude, latitude, brewery_type, city, state, country, website_url, phone } = beer;

  return (
    <BeerContainer>
      <BeerSection>
        <BeerMain>
          {latitude && longitude && (
            <BeerMap name={name} longitude={longitude} latitude={latitude} />
          )}
          <BeerPaper>
            <BeerTitle variant="h4">{name}</BeerTitle>
            <BeerType variant="h6">Type: {brewery_type}</BeerType>
            <BeerAddress variant="body2">
              {city}, {state}
            </BeerAddress>
            <BeerAddress variant="body2">{country}</BeerAddress>
            {website_url && (<BeerButton size="small" color="primary">
              <Link href={website_url} target="_blank">Website</Link>
            </BeerButton>)}
            {phone && (<BeerButton size="small" color="primary">
              <Link href={`tel:${phone}`}>Phone</Link>
            </BeerButton>)}
          </BeerPaper>
        </BeerMain>
      </BeerSection>
    </BeerContainer>
  );
};

export default Beer;
