import { useQuery } from 'react-query';
import { authTokenName } from '../auth';
import getCookies from '../getCookies';
import { apiUrl } from '../consts';
import { useRouter } from 'next/router';

const useCurrentUser = () => {
  const { pathname, push } = useRouter();

  const userQuery = useQuery(
    ['me'],
    () =>
      fetch(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${getCookies(authTokenName)}`,
        },
      }).then((res) => res.json()),
    {
      refetchInterval: 30000,
      select: (res) => (res?.data ? res.data : res),
    }
  );

  if (
    userQuery?.data?.statusCode === 401 ||
    userQuery?.data?.message === 'Unauthorized'
  ) {
    if (!pathname.startsWith('/games') && pathname !== '/') {
      push('/login');
    }
  }

  return userQuery;
};

export default useCurrentUser;
