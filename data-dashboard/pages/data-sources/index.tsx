import fileToBase64 from '@/lib/base64';
import trpc from '@/lib/hooks/trpc';

// Note: this board id exists only in local DB
const MOCK_BOARD_ID = '90b2dbcd-383e-4504-92c7-a5fd977eab71';

export default function DataSourcesPage() {
  const { mutate } = trpc.dataSources.createDataSource.useMutation();
  const { data, isLoading } = trpc.dataSources.listDataSources.useQuery();

  return (
    <div className="border flex flex-col items-center mt-4 py-8">
      <h1 className="text-4xl">
        Data sources page
      </h1>
      <input
        type="file"
        onChange={async (e) => {
          if (e.target.files === null) return;
          const file = e.target.files.item(0);
          if (file === null) return;
          const encoded = await fileToBase64(file);
          mutate({
            boardId: MOCK_BOARD_ID,
            encodedFile: encoded,
            fileName: file.name,
          });
        }}
      />

      { isLoading && <div>Loading...</div> }

      <ul>
        { data !== undefined && data.dataSources.map((dataSource) => (
          <li>
            {dataSource.fileName}
            {' '}
            -
            {dataSource.createdAt}
          </li>
        )) }
      </ul>

    </div>
  );
}
