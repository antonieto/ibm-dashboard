/* eslint-disable react/jsx-wrap-multilines */
import styled from 'styled-components';
import { Close } from '@carbon/icons-react';
import { ChartType } from '@/lib/components/ChartTypeMenu/ChartTypeMenu';
import { useMemo, useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import IbmButton from '../IbmButton/IbmButton';
import DataSourceOrigin from '../DataSourceOrigin/DataSourceOrigin';
import DataSourceSelection from '../DataSourceSelection/DataSourceSelection';
import ChartConfiguration, { ChartToCreate } from '../ChartConfiguration/ChartConfiguration';

const Container = styled.div`
  background-color: #f8f8f8;
  border: none;

  height: 95vh; width: 95vw;

  position: relative;
  z-index: 0;

  display: flex;
  flex-direction: column;

  border-radius: 3px;
`;

const Header = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  border-bottom: 1px solid #d2d3d4;
`;

const Body = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainerButton = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s ease-in-out;

  color: #4d4d4d;
  &:hover {
    background-color: #efefef;
  }

  &:active {
    background-color: #cbcbcb;
  }
`;

const GroupRowContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  gap: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #4d4d4d;
`;

const TitleChartType = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #4d4d4d;
`;

const StepNumber = styled.div`
  font-size: 16px;
  color: #4d4d4d;
`;

const StepTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #393939;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  chartType: ChartType;
  boardId: string;
  onCreate: (chartToCreate: ChartToCreate) => void;
}

const TypeToTitleMap = new Map<ChartType, string>([
  ['line', 'Linea'],
  ['bar', 'Barras'],
  ['pie', 'Pastel'],
]);

export default function CreateChartFlow({
  isOpen,
  onClose,
  chartType,
  boardId,
  onCreate,
}: Props): JSX.Element {
  const [step, setStep] = useState(1);
  const [originDataSource, setOriginDataSource] = useState<
    'files' | 'database'
  >('files');
  const [chartToCreate, setChartToCreate] = useState<ChartToCreate>({
    boardId,
    dataSourceId: '',
    height: 0,
    width: 0,
    title: '',
    type: chartType,
    x: 0,
    y: 0,
    columnSettings: {
      indexColumn: 0,
      categoryColumns: [],
    },
  });
  const handleOnClose = () => {
    setStep(1);
    onClose();
  };

  const steps = useMemo(
    () => [
      {
        title: 'Selecciona el origen de los datos',
        component: (
          <DataSourceOrigin
            onSelect={(origin) => {
              setOriginDataSource(origin);
            }}
            header={
              <>
                <StepNumber>Paso 1</StepNumber>
                <StepTitle>Selecciona el origen de los datos</StepTitle>
              </>
            }
          />
        ),
      },
      {
        title: 'Selecciona una fuente de datos',
        component: (
          <DataSourceSelection
            dataSourceOrigin={originDataSource}
            onSelect={(dataSourceId: string) => {
              setChartToCreate({
                ...chartToCreate,
                dataSourceId,
              });
            }}
            header={
              <>
                <StepNumber>Paso 2</StepNumber>
                <StepTitle>Selecciona una fuente de datos</StepTitle>
              </>
            }
            onClose={handleOnClose}
          />
        ),
      },
      {
        title: 'Configura la gráfica',
        component: (
          <ChartConfiguration
            chartType={chartType}
            dataSourceId={chartToCreate.dataSourceId}
            chartToCreate={chartToCreate}
            onSetChartToCreate={setChartToCreate}
            title={chartToCreate.title}
            onChangeTitle={(title) => {
              setChartToCreate({
                ...chartToCreate,
                title,
              });
            }}
          />
        ),
      },
    ],
    [chartType, originDataSource, chartToCreate],
  );

  const handleNextStep = () => {
    if (step < steps.length) {
      if (steps[step - 1].title === 'Selecciona una fuente de datos' && chartToCreate.dataSourceId === '') {
        // Deactivate the button until data source is selected
        return;
      }
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleCreateChart = async () => {
    onCreate({
      ...chartToCreate,
    });
    // Handle chart creation
  };

  return (
    <ModalContainer open={isOpen} onClose={handleOnClose}>
      <Container>
        <Header>
          <GroupRowContainer>
            <IconContainerButton onClick={handleOnClose}>
              <Close aria-label="close" size={24} />
            </IconContainerButton>

            <GroupRowContainer>
              <Title>Agregar grafica:</Title>
              <TitleChartType>
                {`${TypeToTitleMap.get(chartType)}`}
              </TitleChartType>
            </GroupRowContainer>
          </GroupRowContainer>

          <GroupRowContainer>
            <IbmButton
              text="Cancelar"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                height: '100%',
                width: '100px',
                backgroundColor: '#4d4d4d',
              }}
              onClick={handleOnClose}
            />
            {step < steps.length ? (
              <IbmButton
                text="Siguiente"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0 20px',
                  height: '100%',
                  width: '100px',
                }}
                onClick={handleNextStep}
              />
            ) : (
              <IbmButton
                text="Crear"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0 20px',
                  height: '100%',
                  width: '100px',
                  backgroundColor: '#3CD05D',
                }}
                onClick={handleCreateChart}
              />
            )}
          </GroupRowContainer>
        </Header>

        <Body>{steps[step - 1].component}</Body>
      </Container>
    </ModalContainer>
  );
}
