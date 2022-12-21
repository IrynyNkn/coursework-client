import { apiUrl } from '../../../utils/consts';

export const getCurrentUser = async (
  accessToken: string | undefined | null
) => {
  let user = null;
  try {
    const res = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();

    if (!result.error && result.data) {
      user = result.data;
    }
  } catch (e) {
    console.log('Error while querying current user', e);
  }

  return user;
};
