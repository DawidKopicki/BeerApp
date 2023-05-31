import { getRandomBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const getRandomSelection = (array: Beer[], count: number) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count);
};

const fetchData = (setData: (data: Beer[]) => void) => {
  const fetchFromNetwork = async () => {
    try {
      const { data } = await getRandomBeerList();
      setData(getRandomSelection(data, 10));
    } catch (error) {
      handle(error);
    }
  };

  const fetchFromCache = async () => {
    try {
      const cache = await caches.open('beer-cache');
      const cachedResponse = await cache.match('/api/random-beer-list');
      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        setData(getRandomSelection(cachedData, 10));
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

export { fetchData };
