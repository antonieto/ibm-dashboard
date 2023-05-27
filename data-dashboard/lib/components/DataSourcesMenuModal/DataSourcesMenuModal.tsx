import { trpc } from '@/lib/hooks';
import styled from 'styled-components';
import ModalContainer from '../ModalContainer/ModalContainer';

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
        <p>Selecciona la fuente de datos con la que quiere alimentar la gráfica</p>
      </Drawer>
    </ModalContainer>
  );
}
