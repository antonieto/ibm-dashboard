import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => res.json({ env: process.env });

export default handler;
