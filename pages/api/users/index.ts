
export const getCurrentUser = async (
  accessToken: string | undefined | null
) => {
  let user = null;
  try {
    const res = await fetch(`${process.env.API_URL || process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();
    console.log('Current User Result', result);

    if (!result.error && result.data) {
      user = result.data;
    }
  } catch (e) {
    console.log('Error while querying current user', e);
  }

  return user;
};
