/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';
import { useState } from 'react';
import { trpc } from '@/lib/hooks';
import { useOpenDataSourcesModalContext } from '@/pages/boards/[id]';
import DataSourceItem from '../DataSourceItem/DataSourceItem';
import IbmButton from '../IbmButton/IbmButton';

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
  height: 100%;

  margin-top: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 5px;
  overflow-y: auto;
`;

const RowContainer = styled.div`
  margin: 12px 0;
`;

const OptionCard = styled.div<{ readonly selected: boolean }>`
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 10px;

  border: ${(props) =>
    props.selected ? '2px solid #0F62FE' : '2px solid #d2d3d'};

  cursor: pointer;
`;

interface Props {
  dataSourceOrigin: 'files' | 'database';
  onSelect: (dataSourceId: string) => void;
  header?: JSX.Element;
  onClose: () => void;
}

export default function DataSourceSelection({
  dataSourceOrigin,
  onSelect,
  header,
  onClose,
}: Props): JSX.Element {
  const { data } = trpc.dataSources.listPrivateDataSources.useQuery();
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<string>('');
  const { setIsDataSourcesModalOpen } = useOpenDataSourcesModalContext();

  if (dataSourceOrigin === 'database') {
    return (
      <Container>
        <Header>{header}</Header>
        <Body>
          <div>Datos de la industria</div>
          <div>Working on it</div>
        </Body>
      </Container>
    );
  }
  return (
    <Container>
      <Header>{header}</Header>
      <Body>
        {data?.dataSources && data?.dataSources.length > 0
          ? data.dataSources.map((dataSource) => (
            <OptionCard selected={selectedDataSourceId === dataSource.id}>
              <RowContainer
                onClick={() => {
                  setSelectedDataSourceId(dataSource.id);
                  onSelect(dataSource.id);
                }}
              >
                <DataSourceItem
                  id={dataSource.id}
                  fileName={dataSource.fileName}
                  createdAt={new Date(dataSource.createdAt)}
                />
              </RowContainer>
            </OptionCard>
          )) : (
            <>
              <div>No se detectaron fuentes de datos de archivos</div>
              <IbmButton
                text="Añade una fuente de datos"
                onClick={() => {
                  onClose();
                  setIsDataSourcesModalOpen(true);
                }}
                style={{
                  marginTop: '20px',
                  width: 'auto',
                  paddingRight: '20px',
                }}
              />
            </>
          )}
      </Body>
    </Container>
  );
}
