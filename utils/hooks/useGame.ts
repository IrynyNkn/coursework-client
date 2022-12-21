import { useQuery } from 'react-query';
import { authTokenName } from '../auth';
import { getGameById } from '../../pages/api/games';
import { GameDataType } from '../types/games';

const fetchGame = async (id: string) => {
  const accessToken = localStorage.getItem(authTokenName);
  return await getGameById(accessToken, id);
};

const useGame = (id: string) => {
  const gameQuery = useQuery<GameDataType | null>(
    ['games', id],
    () => fetchGame(id),
    {
      refetchOnMount: false,
    }
  );

  return {
    ...gameQuery,
    data: gameQuery.data
      ? {
          ...gameQuery.data,
          genres: gameQuery.data.genres.map((genre: any) => genre.genre),
          platforms: gameQuery.data.platforms.map((plt: any) => plt.platform),
        }
      : null,
  };
};

export default useGame;
