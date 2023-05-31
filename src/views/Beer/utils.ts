import { getBeer } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  const fetchFromNetwork = async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  };

  const fetchFromCache = async () => {
    try {
      const cache = await caches.open('beer-cache');
      const cachedResponse = await cache.match(`/api/beer/${id}`);
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

export { fetchData };
