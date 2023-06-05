import formidable from 'formidable';
import * as fs from 'fs';
import handlerWithAuth from '@/lib/utils/handlerWithAuth';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handlerWithAuth(async ({ fileStorage, res, req, user }) => {
  if (!(await user())) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const form = new formidable.IncomingForm();

  return form.parse(req, async (err, _, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const file = files.file as formidable.File;
    const { originalFilename } = file;
    if (!originalFilename) {
      return res.status(400).json({ error: 'No file provided' });
    }

    console.log({ file });

    const buffer = fs.readFileSync(file.filepath);

    const handle = await fileStorage.uploadFile(originalFilename, buffer);

    return res.status(200).json({ handle });
  });
});
