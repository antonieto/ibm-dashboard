import { NextApiRequest, NextApiResponse } from 'next';
import { createContext } from '@/server/trpc/context';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const context = await createContext({ req, res });
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err !== null) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    const { file } = files as { file: formidable.File };
    console.log({ file, fields, context });
    return res.status(200).json({ message: 'File uploaded successfully' });
  });

  return res.status(200).json({ message: 'File uploaded successfully' });
}
