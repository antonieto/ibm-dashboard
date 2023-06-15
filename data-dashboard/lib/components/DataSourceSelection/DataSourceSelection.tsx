/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import styled from 'styled-components';
import { useState } from 'react';
import { trpc } from '@/lib/hooks';
import DataSourceItem from '../DataSourceItem/DataSourceItem';

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
  width: 700px;
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
}

export default function DataSourceSelection({
  dataSourceOrigin,
  onSelect,
  header,
}: Props): JSX.Element {
  const { data: dataPrivate } = trpc.dataSources.listPrivateDataSources.useQuery();
  const { data: dataPublic } = trpc.dataSources.listPublicDataSorces.useQuery();
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<string>('');

  const currentData = dataSourceOrigin === 'database' ? dataPublic : dataPrivate;
  console.log('xd');
  return (
    <Container>
      <Header>{header}</Header>
      <Body>
        {currentData?.dataSources.map((dataSource) => (
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
        ))}
      </Body>
    </Container>
  );
}
