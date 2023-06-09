import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { TextInput, InputField } from '@/lib/components';
import { trpc } from '@/lib/hooks';
import DropdownInput from '../DropdownInput/DropdownInput';
import PreviewChart from '../PreviewChart/PreviewChart';
import { ChartSettings } from '../Chart/Chart';
import { ChartType } from '../ChartTypeMenu/ChartTypeMenu';
import { ChartToCreate } from '../CreateChartFlow/CreateChartFlow';

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
}

export default function ChartConfiguration({
  chartType,
  dataSourceId,
  chartToCreate,
}: Props): JSX.Element {
  const [title, setTitle] = useState<string>('');

  const [settings, setSettings] = useState<ChartSettings>({
    colors: ['blue'],
    type: chartType,
    twClassName: 'mt-6',
    categories: [],
    index: '',
    yAxisWidth: 48,
  });

  const { data, isLoading, error } = trpc.dataSources.describeDataSource.useQuery(
    { dataSourceId },
    {
      onSuccess: (data) => setSettings({
        ...settings,
        index: data.categories.at(0)?.name ?? '',
        categories: [data.categories.slice(1).at(0)?.name ?? ''],
      }),
    },
  );

  const handleSettingsChange = (newSettings: ChartSettings) => {

  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
              setSettings({
                ...settings,
                index: data.categories.at(option)?.name ?? '',
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
              setSettings({
                ...settings,
                categories: [data.categories.at(option)?.name ?? ''],
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
