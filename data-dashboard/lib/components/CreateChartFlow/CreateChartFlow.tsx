import styled from 'styled-components';
import { Close } from '@carbon/icons-react';
import ModalContainer from '../ModalContainer/ModalContainer';
import IbmButton from '../IbmButton/IbmButton';
import { ChartType } from '@/lib/components/ChartTypeMenu/ChartTypeMenu';

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
  font-size: 20px;
  font-weight: 400;
  color: #4d4d4d;
`;

const TitleChartType = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #4d4d4d;
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
  const handleOnClose = () => {
    onClose();
  };

  return (
    <ModalContainer open={isOpen} onClose={onClose}>
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
            />
            <IbmButton
              text="Crear"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                height: '100%',
                width: '100px',
                opacity: 0.5,
              }}
            />
          </GroupRowContainer>
        </Header>
      </Container>
    </ModalContainer>
  );
}
