import styled from 'styled-components';

import trpc from '@/lib/hooks/trpc';
import { IbmButton, IbmSearchBar, BoardList } from '../lib/components';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const BoardsContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 45%;
  height: 100%;
`;

const BoardsBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50px;

  margin-top: 25%;
  margin-bottom: 20px;

  gap: 10px;
`;

const BoardBarContainerButton = styled.div`
  width: 35%;
`;

export default function boards() {
  const { isLoading } = trpc.boards.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BoardContainer>
      <BoardsContainerContent>
        <BoardsBarContainer>
          <BoardBarContainerButton>
            <IbmButton text="Crear un tablero" />
          </BoardBarContainerButton>
          <IbmSearchBar placeholder="Search" />
        </BoardsBarContainer>
        <BoardList />
      </BoardsContainerContent>
    </BoardContainer>
  );
}
