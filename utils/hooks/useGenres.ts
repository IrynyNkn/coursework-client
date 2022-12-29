import { useQuery } from 'react-query';
import { GenreType } from '../types/games';
import { proxyUrl } from '../consts';

const useGenres = () => {
  const genresQuery = useQuery<GenreType[]>('genres', () =>
    fetch(`${proxyUrl}/genres`).then((res) => res.json())
  );

  return {
    ...genresQuery,
    // @ts-ignore
    data: genresQuery.data?.error ? [] : genresQuery.data,
  };
};

export default useGenres;
