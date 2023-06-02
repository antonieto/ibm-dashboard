/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BarChart, LineChart, DonutChart } from '@tremor/react';
import ChartCard from '../ChartCard/ChartCard';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type ChartType = 'bar' | 'line' | 'pie';

interface ChartProps {
  className?: string;
  index: string;
  colors: (
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'
  )[];
  yAxisWidth?: number;
}

interface BarChartProps extends ChartProps {
  categories: string[];
}

interface PieChartProps extends ChartProps {
  category: string;
}

interface ChartData {
  [index: string]: number | string;
}

type TypeChartProps =
  | {
      type: 'bar';
      chartProps: BarChartProps;
    }
  | {
      type: 'line';
      chartProps: BarChartProps;
    }
  | {
      type: 'pie';
      chartProps: PieChartProps;
    };

type Props = {
  id: string;
  title: string;
  data: ChartData[];
  removeChart: (id: string) => void;
} & TypeChartProps;

const chartTypeMap = new Map<ChartType, any>([
  ['bar', BarChart],
  ['line', LineChart],
  ['pie', DonutChart],
]);

export default function Chart({
  id,
  type,
  title,
  chartProps,
  data,
  removeChart,
}: Props): JSX.Element {
  if (chartTypeMap.has(type as ChartType) === false) {
    throw new Error(`Chart type ${type} is not supported`);
  }

  return (
    <ChartCard
      title={title}
      removeChart={() => {
        removeChart(id);
      }}
    >
      {type === 'bar' && <BarChart {...chartProps} data={data} />}
      {type === 'line' && <LineChart {...chartProps} data={data} />}
      {type === 'pie' && <DonutChart {...chartProps} data={data} />}
    </ChartCard>
  );
}
