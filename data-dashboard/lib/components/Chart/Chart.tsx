/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BarChart, LineChart, DonutChart } from '@tremor/react';
import ChartCard from '../ChartCard/ChartCard';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

type ChartType = 'bar' | 'line' | 'pie';

export type ChartData = Record<string, string | number>;

export type ChartColor =
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

export type ChartSettings = {
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
  removeChart: (id: string) => void;
  data: Record<string, any>[];
  settings: ChartSettings;
}

export default function Chart({
  id,
  title,
  removeChart,
  data,
  settings,
}: Props): JSX.Element {
  const firstCategory = settings.categories[0];
  if (settings.type === 'pie' && firstCategory === undefined) {
    throw new Error('Pie chart needs at least one category');
  }

  if (!data) return <div>Loading...</div>;
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
          title={title}
        />
      )}
      {settings.type === 'line' && (
        <LineChart
          {...{ ...settings, className: settings.twClassName }}
          data={data}
          title={title}
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
          title={title}
        />
      )}
    </ChartCard>
  );
}
