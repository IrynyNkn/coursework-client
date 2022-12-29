import { useQuery } from 'react-query';
import { PlatformsType } from '../types/games';
import { proxyUrl } from '../consts';

const usePlatforms = () => {
  const platformsQuery = useQuery<PlatformsType[]>('platforms', () =>
    fetch(`${proxyUrl}/platforms`).then((res) => res.json())
  );

  return {
    ...platformsQuery,
    // @ts-ignore
    data: platformsQuery.data?.error ? [] : platformsQuery.data,
  };
};

export default usePlatforms;
