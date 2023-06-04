import Chart from '@/lib/components/Chart/Chart';
import TopLayout from '@/lib/components/TopLayout/TopLayout';
import { trpc } from '@/lib/hooks';
import { NextPageWithLayout } from '../_app';

const MOCK_DATA = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
];

const MOCK_NAMES_DATA = [
  {
    Nombre: 'Antonio',
    Saldo: 200,
    Deuda: 150,
  },
  {
    Nombre: 'Angel',
    Saldo: 300,
    Deuda: 350,
  },
  {
    Nombre: 'Oscar',
    Saldo: 150,
    Deuda: 123,
  },
  {
    Nombre: 'David',
    Saldo: 400,
    Deuda: 400,
  },
];

const MOCK_CHART_PROPS: React.ComponentProps<typeof Chart> = {
  id: '1',
  title: 'Test chart',
  removeChart: () => {
    console.log('Removing chart lol!');
  },
  data: MOCK_DATA,
  settings: {
    categories: ['SemiAnalysis', 'The Pragmatic Engineer'],
    index: 'date',
    colors: ['slate', 'zinc', 'pink'],
    type: 'line',
    twClassName: 'w-full h-96',
    yAxisWidth: 50,
  },
};

function TestChartsPage() {
  const { data } = trpc.charts.getChartData.useQuery({ chartId: '' });
  return (
    <div>
      <h1> Testing charts here </h1>
      <Chart {...MOCK_CHART_PROPS} />
      <Chart
        id="2"
        data={MOCK_NAMES_DATA}
        removeChart={() => console.log('removing')}
        title="Test chart 2"
        settings={{
          index: 'Nombre',
          categories: ['Saldo', 'Deuda'],
          colors: ['blue', 'red', 'green'],
          twClassName: 'w-full h-96',
          type: 'bar',
          yAxisWidth: 50,
        }}
      />
    </div>
  );
}

const TestChartsPageWithLayout: NextPageWithLayout = TestChartsPage;
TestChartsPageWithLayout.getLayout = (page) => <TopLayout>{page}</TopLayout>;

export default TestChartsPageWithLayout;
