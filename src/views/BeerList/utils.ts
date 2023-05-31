import { getBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Beer[]) => void) => {
  const fetchFromNetwork = async () => {
    try {
      const response = await getBeerList();
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  };

  const fetchFromCache = async () => {
    try {
      const cache = await caches.open('beer-cache');
      const cachedResponse = await cache.match('/api/beer-list');
      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        setData(cachedData);
      } else {
        fetchFromNetwork();
      }
    } catch (error) {
      fetchFromNetwork();
    }
  };

  if (navigator.onLine) {
    fetchFromNetwork();
  } else {
    fetchFromCache();
  }
};

const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export { capitalizeFirstLetter, fetchData };
