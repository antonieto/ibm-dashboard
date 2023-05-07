import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => res.json({ env: process.env });

export default handler;
