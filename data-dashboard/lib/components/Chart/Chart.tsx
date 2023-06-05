/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BarChart, LineChart, DonutChart } from '@tremor/react';
import ChartCard from '../ChartCard/ChartCard';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type ChartType = 'bar' | 'line' | 'pie';

type ChartData = Record<string, string | number>;

type ChartColor =
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
  | 'rose';

type ChartSettings = {
  colors: ChartColor[];
  type: ChartType;
  twClassName: string;
  index: string;
  yAxisWidth: number;
  categories: string[];
};

interface Props {
  id: string;
  title: string;
  data: ChartData[];
  removeChart: (id: string) => void;
  settings: ChartSettings;
}

export default function Chart({
  id,
  title,
  settings,
  data,
  removeChart,
}: Props): JSX.Element {
  const firstCategory = settings.categories[0];

  if (settings.type === 'pie' && firstCategory === undefined) {
    throw new Error('Pie chart needs at least one category');
  }

  return (
    <ChartCard
      title={title}
      removeChart={() => {
        removeChart(id);
      }}
    >
      {settings.type === 'bar' && (
        <BarChart
          {...{ ...settings, className: settings.twClassName }}
          data={data}
        />
      )}
      {settings.type === 'line' && (
        <LineChart
          {...{ ...settings, className: settings.twClassName }}
          data={data}
        />
      )}
      {settings.type === 'pie' && (
        <DonutChart
          {...{
            ...settings,
            className: settings.twClassName,
            category: firstCategory,
          }}
          data={data}
        />
      )}
    </ChartCard>
  );
}
