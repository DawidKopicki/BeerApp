import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { styled } from '@mui/material/styles';

const BeerMapContainer = styled(MapContainer)(({ theme }) => ({
  height: '300px',
  width: '100%',
}));

interface BeerMapProps {
  name: string;
  latitude: string,
  longitude: string
}

const BeerMap = ({ name, latitude, longitude }: BeerMapProps) => {

  return (
    <BeerMapContainer
      center={[Number(latitude), Number(longitude)]}
      zoom={10}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />
      <CircleMarker
        center={[Number(latitude), Number(longitude)]}
        radius={5}
        color="blue"
        fillColor="blue"
        fillOpacity={0.8}
      >
        <Popup>{name}</Popup>
      </CircleMarker>
    </BeerMapContainer>
  );
};

export default BeerMap;
