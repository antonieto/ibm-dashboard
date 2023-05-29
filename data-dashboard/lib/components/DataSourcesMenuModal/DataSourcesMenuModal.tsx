import { trpc } from '@/lib/hooks';
import styled from 'styled-components';
import fileToBase64 from '@/lib/base64';
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

export default function DataSourcesMenuModal({
  boardId,
  isOpen,
  onClose,
}: Props) {
  const { data } = trpc.dataSources.listDataSources.useQuery();
  const { mutate } = trpc.dataSources.createDataSource.useMutation();

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
              <AddNewDataSourceRow
                onSelectFile={async (file) => {
                  const encoded = await fileToBase64(file);
                  mutate({ boardId, fileName: file.name, encodedFile: encoded });
                }}
              />
              {data?.dataSources.map((dataSource) => (
                <RowContainer>
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
