import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => res.json({ env: process.env, db_url: process.env.DATABASE_URL, test: 'a' });

export default handler;
