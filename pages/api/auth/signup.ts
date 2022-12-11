import {NextApiRequest, NextApiResponse} from "next";
import {apiUrl} from "../../../utils/consts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(req.body),
    });
    const result = await response.json();
    console.log('Result', result)

    if(!result.error) {
      res.status(response.status).json({data: result.data});
    } else {
      const errorMessage = typeof result.message === 'string' ? result.message : result.message[0];
      res.status(response.status).json({error: result.error, message: errorMessage});
    }
  } catch (e) {
    console.log('Error on registration', e);
    res.status(500).json({message: 'Internal Server Error', error: 'Error 500'});
  }
}