import { BarChart, LineChart, DonutChart } from '@tremor/react';
import ChartCard from '../ChartCard/ChartCard';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type ChartType = 'bar' | 'line' | 'pie';

interface Props {
  type: string;
  title: string;
  chartProps: any;
  data: any;
}

const chartTypeMap = new Map<ChartType, any>([
  ['bar', BarChart],
  ['line', LineChart],
  ['pie', DonutChart],
]);

export default function Chart({
  type,
  title,
  chartProps,
  data,
}: Props): JSX.Element {
  if (chartTypeMap.has(type as ChartType) === false) {
    throw new Error(`Chart type ${type} is not supported`);
  }

  const ChartComponent = chartTypeMap.get(type as ChartType);

  return (
    <ChartCard title={title}>
      <ChartComponent {...chartProps} data={data} />
    </ChartCard>
  );
}
