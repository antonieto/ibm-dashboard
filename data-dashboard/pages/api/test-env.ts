import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => res.json({
  env: process.env,
  another_test: process.env.DATABASE_URL,
});

export default handler;
