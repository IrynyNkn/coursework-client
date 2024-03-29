import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = req.cookies.GamelyAuthToken;
  try {
    if (req.method === 'POST') {
      const response = await fetch(`${process.env.API_URL}/platforms`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify(req.body),
      });
      const result = await response.json();

      if (!result.error && response.status < 300) {
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
    } else {
      const response = await fetch(`${process.env.API_URL}/platforms`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await response.json();

      res.status(response.status).json(result);
    }
  } catch (e) {
    console.log('Error on creating/fetching platform', e);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: 'Error 500' });
  }
}
