/* eslint-disable no-unneeded-ternary */
import React from 'react';
import styled from 'styled-components';
import { BarChart, LineChart, DonutChart, Title } from '@tremor/react';
import { ChartData, ChartSettings } from '../Chart/Chart';

const ChartContainer = styled.div`
  width: 70%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  jutify-content: center;
  gap: 20px;
`;

interface Props {
  title?: string;
  data: ChartData[];
  settings: ChartSettings;
}

export default function PreviewChart({
  title,
  data,
  settings,
}: Props): JSX.Element {
  const firstCategory = settings.categories[0];

  if (settings.type === 'pie' && firstCategory === undefined) {
    throw new Error('Pie chart needs at least one category');
  }
  return (
    <ChartContainer>
      <Title>{title ? title : 'Preview Chart'}</Title>
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
    </ChartContainer>
  );
}
