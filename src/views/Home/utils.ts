import { getRandomBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const getRandomSelection = (array: Beer[], count: number) => {
  const shuffledArray = array.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count);
};

const fetchData = (setData: (data: Beer[]) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList();
      setData(getRandomSelection(data, 10));
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
