import Chart from '@/lib/components/Chart/Chart';
import TopLayout from '@/lib/components/TopLayout/TopLayout';
import { trpc } from '@/lib/hooks';
import { NextPageWithLayout } from '../_app';

function TestSerializer() {
  // NOTE: This chart is hard coded
  const { data } = trpc.charts.getChartData.useQuery({ chartId: 'e6b8622d-2e38-499c-8715-3d7be3184a11' });
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <h1>Test Serializer</h1>
      <Chart
        data={data.data}
        id={data.id}
        removeChart={() => console.log('removing')}
        title={data.title}
        key={data.id}
        settings={{
          categories: data.categories,
          colors: ['gray', 'pink', 'green'],
          index: data.index,
          type: data.type,
          yAxisWidth: data.width,
          twClassName: 'w-1/2',
        }}
      />
    </div>
  );
}

const TestSerializerPage: NextPageWithLayout = TestSerializer;
TestSerializerPage.getLayout = function getLayout(page) {
  return (
    <TopLayout>
      {page}
    </TopLayout>
  );
};

export default TestSerializerPage;
