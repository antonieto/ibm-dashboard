import { BarChart, LineChart, DonutChart } from '@tremor/react';
import ChartCard from '../ChartCard/ChartCard';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export enum ChartType {
  bar = 'bar',
  line = 'line',
  pie = 'pie',
}

interface Props {
  type: string;
  title: string;
  chartProps: any;
  data: any;
}

const chartTypeMap = new Map<ChartType, any>([
  [ChartType.bar, BarChart],
  [ChartType.line, LineChart],
  [ChartType.pie, DonutChart],
]);

export default function Chart({
  type,
  title,
  chartProps,
  data,
}: Props): JSX.Element {
  const ChartComponent = chartTypeMap.get(
    ChartType[type as keyof typeof ChartType]
  );

  return (
    <ChartCard title={title}>
      <ChartComponent {...chartProps} data={data} />
    </ChartCard>
  );
}
