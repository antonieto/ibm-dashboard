/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { useState } from 'react';
import styled from 'styled-components';
import { DataBase, Catalog } from '@carbon/icons-react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  margin-top: 70px;
`;

const Body = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 30px;

  margin-top: 10%;
`;

const OptionCard = styled.div<{ readonly selected: boolean }>`
  width: 400px;
  height: 200px;
  border-radius: 3px;
  padding: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 10px;

  background-color: #efefef;

  border: ${(props) =>
    props.selected ? '2px solid #0F62FE' : '2px solid #d2d3d'};

  cursor: pointer;
`;

const CardTitle = styled.div<{ readonly selected: boolean }>`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => (props.selected ? '#0F62FE' : '#4d4d4d')};
`;

const CardIcon = styled.div<{ readonly selected: boolean }>`
  color: ${(props) => (props.selected ? '#0F62FE' : '#4d4d4d')};
`;

interface Props {
  onSelect: (dataSource: 'files' | 'database') => void;
  header?: JSX.Element;
}

export default function DataSourceOrigin({
  onSelect,
  header,
}: Props): JSX.Element {
  const [selected, setSelected] = useState<'files' | 'database'>('files');

  const handleSelect = (dataSource: 'files' | 'database') => {
    setSelected(dataSource);
    onSelect(dataSource);
  };

  return (
    <Container>
      <Header>{header}</Header>
      <Body>
        <ContentContainer>
          <OptionCard
            onClick={() => {
              handleSelect('files');
            }}
            selected={selected === 'files'}
          >
            <CardIcon selected={selected === 'files'}>
              <Catalog width={50} height={50} />
            </CardIcon>
            <CardTitle selected={selected === 'files'}>Archivos .csv</CardTitle>
          </OptionCard>
          <OptionCard
            onClick={() => {
              handleSelect('database');
            }}
            selected={selected === 'database'}
          >
            <CardIcon selected={selected === 'database'}>
              <DataBase width={50} height={50} />
            </CardIcon>
            <CardTitle selected={selected === 'database'}>
              Datos de la industria
            </CardTitle>
          </OptionCard>
        </ContentContainer>
      </Body>
    </Container>
  );
}
