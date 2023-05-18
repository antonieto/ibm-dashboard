import { fileToBase64 } from '@/lib/base64';
import trpc from '@/lib/hooks/trpc';
import { useState } from 'react';

export default function DataSourcesPage() {
  const { mutate } = trpc.dataSources.createDataSource.useMutation();
  const [fileBuffer, setFileBuffer] = useState<File | null>(null);

  return (
    <div>
      Data sources page
      <input
        type="file"
        onChange={async (e) => {
          if (e.target.files === null) return;
          const file = e.target.files.item(0);
          if (file === null) return;
          setFileBuffer(file);
          const encoded = await fileToBase64(file);
          mutate({
            boardId: '1',
            encodedFile: encoded,
          });
        }}
      />
      {fileBuffer !== null && <div>{fileBuffer.name}</div>}
    </div>
  );
}
