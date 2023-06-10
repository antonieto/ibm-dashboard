/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { BarChart, LineChart, DonutChart } from '@tremor/react';
import ChartCard from '../ChartCard/ChartCard';
import trpc from '@/lib/hooks/trpc';

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
  dataSourceId: string;
}

export default function Chart({
  id,
  title,
  removeChart,
  dataSourceId,
}: Props): JSX.Element {
  // const firstCategory = settings.categories[0];
  const [firstCategory, setFirstCategory] = React.useState<string | undefined>(
    undefined,
  );

  const { data } = trpc.charts.getChartData.useQuery({
    chartId: dataSourceId,
  });

  const [settings, setSettings] = React.useState<ChartSettings>({
    colors: ['blue', 'pink', 'green'],
    type: 'bar',
    twClassName: 'mt-6',
    index: '',
    yAxisWidth: 48,
    categories: [],
  });

  if (settings.type === 'pie' && firstCategory === undefined) {
    throw new Error('Pie chart needs at least one category');
  }

  useEffect(() => {
    if (data) {
      setSettings({
        colors: ['blue', 'pink', 'green'],
        type: data.type,
        twClassName: 'mt-6',
        index: data.index,
        yAxisWidth: 48,
        categories: data.categories,
      });

      setFirstCategory(data.categories[0]);
    }
  }, [data]);

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
          data={data.data}
        />
      )}
      {settings.type === 'line' && (
        <LineChart
          {...{ ...settings, className: settings.twClassName }}
          data={data.data}
        />
      )}
      {settings.type === 'pie' && (
        <DonutChart
          {...{
            ...settings,
            className: settings.twClassName,
            category: firstCategory,
          }}
          data={data.data}
        />
      )}
    </ChartCard>
  );
}
