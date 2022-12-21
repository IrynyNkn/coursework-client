import { NextApiRequest, NextApiResponse } from 'next';
import { apiUrl } from '../../../utils/consts';

export const getGameById = async (
  accessToken: string | undefined | null,
  id: string
) => {
  let game = null;

  try {
    const res = await fetch(`${apiUrl}/games/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await res.json();

    if (!result.error && result.data) {
      game = result.data;
    }
  } catch (e) {
    console.log('Error while querying game by id', e);
  }

  return game;
};
