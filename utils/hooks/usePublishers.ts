import { useQuery } from 'react-query';
import { PublisherType } from '../types/games';
import { proxyUrl } from '../consts';

const usePublishers = () => {
  const publishersQuery = useQuery<PublisherType[]>('publishers', () =>
    fetch(`${proxyUrl}/publishers`).then((res) => res.json())
  );

  return {
    ...publishersQuery,
    // @ts-ignore
    data: publishersQuery.data?.error ? [] : publishersQuery.data,
  };
};

export default usePublishers;
