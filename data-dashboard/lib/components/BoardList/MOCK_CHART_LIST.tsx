import React from 'react';
import Chart from '../Chart/Chart';

type Props = {
  id: string;
  xIndex: number;
  yIndex: number;
  width: number;
  height: number;
};

export const MOCK_CHART_LIST = [
  {
    id: 'widget1',
    title: 'Widget 1',
    xIndex: 0,
    yIndex: 0,
    width: 2,
    height: 3,
    type: 'bar',
    chartProps: {
      className: 'mt-6',
      index: 'name',
      categories: ['Number of threatened species'],
      colors: ['blue'],
      yAxisWidth: 48,
    },
    data: [
      {
        name: 'Mammals',
        'Number of threatened species': 10,
      },
      {
        name: 'Birds',
        'Number of threatened species': 20,
      },
      {
        name: 'Reptiles',
        'Number of threatened species': 30,
      },
      {
        name: 'Amphibians',
        'Number of threatened species': 40,
      },
    ],
  },
  {
    id: 'widget2',
    title: 'Widget 2',
    xIndex: 2,
    yIndex: 0,
    width: 2,
    height: 3,
    type: 'line',
    chartProps: {
      className: 'mt-6',
      index: 'year',
      categories: ['Population growth rate'],
      colors: ['blue'],
      yAxisWidth: 40,
    },
    data: [
      {
        year: '1951',
        'Population growth rate': 1.74,
      },
      {
        year: '1952',
        'Population growth rate': 1.93,
      },
      {
        year: '1953',
        'Population growth rate': 1.9,
      },
      {
        year: '1954',
        'Population growth rate': 1.98,
      },
      {
        year: '1955',
        'Population growth rate': 2,
      },
    ],
  },
  {
    id: 'widget3',
    title: 'Widget 3',
    xIndex: 4,
    yIndex: 0,
    width: 2,
    height: 3,
    type: 'pie',
    chartProps: {
      className: 'mt-6',
      index: 'name',
      category: 'sales',
      colors: ['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber'],
    },
    data: [
      {
        name: 'New York',
        sales: 9800,
      },
      {
        name: 'San Francisco',
        sales: 3900,
      },
      {
        name: 'Austin',
        sales: 4800,
      },
      {
        name: 'Seattle',
        sales: 6000,
      },
      {
        name: 'Chicago',
        sales: 7900,
      },
      {
        name: 'Boston',
        sales: 5600,
      },
    ],
  },
  {
    id: 'widget4',
    title: 'Widget 4',
    xIndex: 6,
    yIndex: 0,
    width: 2,
    height: 3,
    type: 'bar',
    chartProps: {
      className: 'mt-6',
      index: 'name',
      categories: ['Number of threatened species'],
      colors: ['blue'],
      yAxisWidth: 48,
    },
    data: [
      {
        name: 'Mammals',
        'Number of threatened species': 10,
      },
      {
        name: 'Birds',
        'Number of threatened species': 20,
      },
      {
        name: 'Reptiles',
        'Number of threatened species': 30,
      },
      {
        name: 'Amphibians',
        'Number of threatened species': 40,
      },
    ],
  },
  {
    id: 'widget5',
    title: 'Widget 5',
    xIndex: 0,
    yIndex: 3,
    width: 2,
    height: 3,
    type: 'line',
    chartProps: {
      className: 'mt-6',
      index: 'year',
      categories: ['Population growth rate'],
      colors: ['blue'],
      yAxisWidth: 40,
    },
    data: [
      {
        year: '1951',
        'Population growth rate': 1.74,
      },
      {
        year: '1952',
        'Population growth rate': 1.93,
      },
      {
        year: '1953',
        'Population growth rate': 1.9,
      },
      {
        year: '1954',
        'Population growth rate': 1.98,
      },
      {
        year: '1955',
        'Population growth rate': 2,
      },
    ],
  },
] satisfies React.ComponentProps<typeof Chart>[] & Props[];

export default {
  MOCK_CHART_LIST,
};
