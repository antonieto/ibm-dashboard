import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { BarChart, LineChart, DonutChart, Dropdown } from '@tremor/react';
import { TextInput, InputField } from '@/lib/components';
import DropdownInput from '../DropdownInput/DropdownInput';

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
  onConfirm: () => void;
}

export default function ChartConfiguration({ onConfirm }: Props): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

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
            options={['Barras', 'Lineas', 'Donas']}
            onSelect={(option: number) => console.log(option)}
          />
          <DropdownInput
            title="Eje Y"
            options={['Barras', 'Lineas', 'Donas']}
            onSelect={(option: number) => console.log(option)}
          />
        </SettingsBody>
      </SettingsContainer>
      <ChartContainer>chart</ChartContainer>
    </Container>
  );
}
