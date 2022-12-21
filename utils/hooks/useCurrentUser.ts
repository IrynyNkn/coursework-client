import { useQuery } from 'react-query';
import { authTokenName } from '../auth';
import { getCurrentUser } from '../../pages/api/users';
import getCookies from '../getCookies';

const fetchUser = async () => {
  const accessToken = getCookies(authTokenName);
  return await getCurrentUser(accessToken);
};

const useCurrentUser = () => {
  const userQuery = useQuery(['me'], fetchUser, {
    refetchOnMount: false,
  });

  return userQuery;
};

export default useCurrentUser;
