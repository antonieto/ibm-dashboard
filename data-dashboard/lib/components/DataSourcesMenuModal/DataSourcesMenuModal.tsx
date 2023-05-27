import { trpc } from '@/lib/hooks';
import styled from 'styled-components';
import { DataSource } from '@/server/models';
import ModalContainer from '../ModalContainer/ModalContainer';
import IbmTabs, { Tab } from '../IbmTabs';
import DataSourceItem from '../DataSourceItem/DataSourceItem';
import AddNewDataSourceRow from './AddNewDataSourceRow';

interface Props {
  boardId: string;
  isOpen: boolean;
  onClose: () => void;
}

const Drawer = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 100vh;
`;

const SubTitle = styled.span`
  font-size: 1rem;
  color: #393939;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 20px 0;
`;

const TabsContainer = styled.div`
  margin-top: 36px;
`;

const RowContainer = styled.div`
  margin: 12px 0;
`;

const MOCK_DATA_SOURCE_LIST: DataSource[] = [
  {
    id: '1',
    boardId: 'boardId',
    fileName: 'test.xlsx',
    createdAt: new Date(),
    name: 'El data source',
    externalHandle: 'externalHandle',
  },
  {
    id: '2',
    boardId: 'boardId',
    fileName: 'test.xlsx',
    createdAt: new Date(),
    name: 'El data source',
    externalHandle: 'externalHandle',
  },
];

export default function DataSourcesMenuModal({
  boardId,
  isOpen,
  onClose,
}: Props) {
  const { data } = trpc.dataSources.listDataSources.useQuery();

  console.log(data, boardId);

  return (
    <ModalContainer open={isOpen} onClose={onClose}>
      <Drawer>
        <SubTitle>Agregar gráfica</SubTitle>
        <Title>Selecciona la fuente de datos</Title>
        <p>
          Selecciona la fuente de datos con la que quiere alimentar la gráfica
        </p>
        <TabsContainer>
          <IbmTabs>
            <Tab title="Tus fuentes de datos">
              <AddNewDataSourceRow />
              {MOCK_DATA_SOURCE_LIST.map((dataSource) => (
                <RowContainer>
                  <DataSourceItem id={dataSource.id} fileName={dataSource.fileName} createdAt={dataSource.createdAt} />
                </RowContainer>
              ))}
            </Tab>
            <Tab title="Datos de la industria">
              <p>working on it</p>
            </Tab>
          </IbmTabs>
        </TabsContainer>
      </Drawer>
    </ModalContainer>
  );
}
