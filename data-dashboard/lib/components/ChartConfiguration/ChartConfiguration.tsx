import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { TextInput, InputField } from '@/lib/components';
import { trpc } from '@/lib/hooks';
import DropdownInput from '../DropdownInput/DropdownInput';
import PreviewChart from '../PreviewChart/PreviewChart';
import { ChartSettings } from '../Chart/Chart';
import { ChartType } from '../ChartTypeMenu/ChartTypeMenu';

export type ChartToCreate = {
  boardId: string;
  dataSourceId: string;
  height: number;
  width: number;
  title: string;
  x: number;
  y: number;
  type: 'bar' | 'line' | 'pie';
  columnSettings: {
    indexColumn: number;
    categoryColumns: number[];
  };
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 20px;
  gap: 20px;
`;

const SettingsContainer = styled.div`
  width: 35%;
  height: 100%;

  border: 1px solid #d2d3d2;
  border-radius: 3px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;
`;

const SettingsHeader = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #d2d3d4;

  border-radius-top: 3px;
  background-color: #efefef;

  font-size: 1.2rem;
  font-weight: 500;

  color: #4d4d4d;
`;

const SettingsBody = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  gap: 20px;
`;

const ChartContainer = styled.div`
  width: 65%;
  height: 100%;

  border: 1px dashed #d2d3d2;
  border-radius: 3px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  chartType: ChartType;
  dataSourceId: string;
  chartToCreate: ChartToCreate;
  onSetChartToCreate: (newChartToCreate: ChartToCreate) => void;
  title: string;
  onChangeTitle: (newTitle: string) => void;
}

export default function ChartConfiguration({
  chartType,
  dataSourceId,
  chartToCreate,
  onSetChartToCreate,
  title,
  onChangeTitle,
}: Props): JSX.Element {
  const [settings, setSettings] = useState<ChartSettings>({
    colors: ['blue', 'pink', 'green', 'violet'],
    type: chartType,
    twClassName: 'mt-6',
    categories: [],
    index: '',
    yAxisWidth: 48,
  });

  const { data, isLoading, error } = trpc.dataSources.describeDataSource.useQuery(
    { dataSourceId },
    {
      onSuccess: (data) => {
        setSettings({
          ...settings,
          index: data.categories.at(0)?.name ?? '',
          categories: [data.categories.slice(1).at(0)?.name ?? ''],
        });
        onSetChartToCreate({
          ...chartToCreate,
          columnSettings: {
            indexColumn: 0,
            categoryColumns: [1],
          },
        });
      },
    },
  );

  const handleSettingsChange = ({
    xAxisColumn,
    yAxisColumns,
  }: {
    xAxisColumn?: number;
    yAxisColumns?: number[];
  }) => {
    onSetChartToCreate({
      ...chartToCreate,
      columnSettings: {
        categoryColumns: yAxisColumns ?? chartToCreate.columnSettings.categoryColumns,
        indexColumn: xAxisColumn ?? chartToCreate.columnSettings.indexColumn,
      },
    });
    setSettings({
      ...settings,
      index: xAxisColumn ? data?.categories.at(xAxisColumn)?.name ?? '' : settings.index,
      categories: yAxisColumns
        ? yAxisColumns.map((column) => data?.categories.at(column)?.name ?? '')
        : settings.categories,
    });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(event.target.value);
  };

  if (error) {
    return <div>Something happened</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No data</div>;

  return (
    <Container>
      <SettingsContainer>
        <SettingsHeader>Ajustes</SettingsHeader>
        <SettingsBody>
          <InputField
            label="Titulo"
            name="titulo"
            inputChild={TextInput}
            inputProps={{
              type: 'text',
              value: title,
              onChange: handleChangeTitle,
              placeholder: 'e.g. grafica',
              required: true,
            }}
          />
          <DropdownInput
            title="Eje X"
            options={data.categories.map((category) => ({
              label: category.name,
              value: category.column,
            }))}
            onSelect={(option) => {
              handleSettingsChange({
                xAxisColumn: option,
              });
            }}
          />
          <DropdownInput
            title="Eje Y"
            options={data.categories
              .map((category) => ({
                value: category.column,
                label: category.name,
              }))
              .filter((category) => category.label !== settings.index)}
            onSelect={(option) => {
              handleSettingsChange({
                yAxisColumns: [option],
              });
            }}
          />
        </SettingsBody>
      </SettingsContainer>
      <ChartContainer>
        <PreviewChart
          title={title}
          data={data.previewData}
          settings={settings}
        />
      </ChartContainer>
    </Container>
  );
}

/*
type ChartSettings = {
    colors: ChartColor[];
    type: ChartType;
    twClassName: string;
    index: string;
    yAxisWidth: number;
    categories: string[];
}

*/
