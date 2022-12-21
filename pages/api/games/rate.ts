import { NextApiRequest, NextApiResponse } from 'next';
import { apiUrl } from '../../../utils/consts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const response = await fetch(`${apiUrl}/ratings`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(req.body),
      });
      const result = await response.json();
      console.log('Rate result', result);

      if (!result.error) {
        res.status(response.status).json(result);
      } else {
        const errorMessage =
          typeof result.message === 'string'
            ? result.message
            : result.message[0];
        res
          .status(response.status)
          .json({ error: result.error, message: errorMessage });
      }
    }
  } catch (e) {
    console.log('Error on login', e);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: 'Error 500' });
  }
}
