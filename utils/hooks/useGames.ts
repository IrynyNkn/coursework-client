import { useQuery } from 'react-query';
import { GameDataType } from '../types/games';
import { proxyUrl } from '../consts';

const useGames = () => {
  const gamesQuery = useQuery<GameDataType[]>(
    'games',
    () => fetch(`${proxyUrl}/games`).then((res) => res.json()),
    {
      // @ts-ignore
      select: (result) => result.data,
    }
  );

  return {
    ...gamesQuery,
    data: gamesQuery.data
      ? gamesQuery.data.map((game) => ({
          ...game,
          genres: game.genres.map((genre: any) => genre?.genre || genre),
          platforms: game.platforms.map((plt: any) => plt?.platform || plt),
        }))
      : null,
  };
};

export default useGames;
