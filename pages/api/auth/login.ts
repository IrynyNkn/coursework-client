import {NextApiRequest, NextApiResponse} from "next";
import {apiUrl} from "../../../utils/consts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${apiUrl}/auth/signin`, {
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
      res.status(response.status).json(result);
    }
  } catch (e) {
    console.log('Error on login', e);
    res.status(500).json({message: 'Internal Server Error', error: 'Error 500'});
  }
}