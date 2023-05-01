import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';

const handler: NextApiHandler = (_: NextApiRequest, res: NextApiResponse) => {
  console.log(process.env);
  return res.json(process.env);
};

export default handler;
