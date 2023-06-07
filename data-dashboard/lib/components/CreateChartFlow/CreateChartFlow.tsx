/* eslint-disable react/jsx-wrap-multilines */
import styled from 'styled-components';
import { Close } from '@carbon/icons-react';
import ModalContainer from '../ModalContainer/ModalContainer';
import IbmButton from '../IbmButton/IbmButton';
import { ChartType } from '@/lib/components/ChartTypeMenu/ChartTypeMenu';
import DataSourceOrigin from '../DataSourceOrigin/DataSourceOrigin';
import { useState } from 'react';
import DataSourceSelection from '../DataSourceSelection/DataSourceSelection';
import ChartConfiguration from '../ChartConfiguration/ChartConfiguration';

const Container = styled.div`
  background-color: #f8f8f8;
  border: none;

  height: 95vh;
  width: 95vw;

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
}: Props): JSX.Element {
  const [step, setStep] = useState(1);
  const [originDataSource, setOriginDataSource] = useState<
    'files' | 'database'
  >('files'); // 'files' | 'database
  const handleOnClose = () => {
    setStep(1);
    onClose();
  };

  const steps = [
    {
      title: 'Selecciona el origen de los datos',
      component: (
        <DataSourceOrigin
          onSelect={(origin) => {
            setOriginDataSource(origin);
            console.log(origin);
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
          onSelect={() => {}}
          header={
            <>
              <StepNumber>Paso 2</StepNumber>
              <StepTitle>Selecciona una fuente de datos</StepTitle>
            </>
          }
        />
      ),
    },
    {
      title: 'Configura la gráfica',
      component: (
        <ChartConfiguration
          onConfirm={() => {
            // Handle chart configuration confirmation
            // You can perform necessary actions here
          }}
          header={
            <>
              <StepNumber>Paso 3</StepNumber>
              <StepTitle>Configura la gráfica</StepTitle>
            </>
          }
        />
      ),
    },
  ];

  const handleConfirm = () => {
    if (step < steps.length) {
      //setStep(step + 1);
    } else {
      // All steps completed, perform final actions
    }
  };

  const handleNextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleCreateChart = () => {
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
                  opacity: step === steps.length ? 0.5 : 1,
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
