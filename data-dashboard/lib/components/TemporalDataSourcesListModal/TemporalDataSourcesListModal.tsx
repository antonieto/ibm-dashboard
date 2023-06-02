import { trpc } from '@/lib/hooks';
import styled from 'styled-components';
import ModalContainer from '../ModalContainer/ModalContainer';
import IbmTabs, { Tab } from '../IbmTabs';
import DataSourceItem from '../DataSourceItem/DataSourceItem';

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDataSource: (id: string) => void;
}

export default function TemporalDataSourcesListModal({
  isOpen,
  onClose,
  onSelectDataSource,
}: Props) {
  const { data } = trpc.dataSources.listPrivateDataSources.useQuery();

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
              {data?.dataSources.map((dataSource) => (
                <RowContainer
                  onClick={() => {
                    onSelectDataSource(dataSource.id);
                  }}
                >
                  <DataSourceItem
                    id={dataSource.id}
                    fileName={dataSource.fileName}
                    createdAt={new Date(dataSource.createdAt)}
                  />
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
