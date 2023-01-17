import { QueriesOptions, useQuery } from 'react-query';
import { authTokenName } from '../auth';
import getCookies from '../getCookies';
import { useRouter } from 'next/router';
import { UserType } from '../types/users';

const useCurrentUser = (options:QueriesOptions<any>  = {}) => {
  const { pathname, push } = useRouter();

  const userQuery = useQuery<UserType>(
    ['me'],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${getCookies(authTokenName)}`,
        },
      }).then((res) => res.json()),
    {
      // refetchInterval: 1000 * 60 * 4,
      // @ts-ignore
      select: (res) => (res?.data ? res.data : res),
      ...options
    }
  );

  if (
    // @ts-ignore
    userQuery?.data?.statusCode === 401 ||
    // @ts-ignore
    userQuery?.data?.message === 'Unauthorized'
  ) {
    if (!pathname.startsWith('/games') && pathname !== '/') {
      push('/login');
    }
  }

  return userQuery;
};

export default useCurrentUser;
