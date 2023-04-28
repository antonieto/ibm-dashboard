import styled from 'styled-components';

import IbmButton from '@/components/IbmButton/IbmButton';
import IbmSearchBar from '@/components/IbmSearchBar/IbmSearchBar';
import BoardList from '@/components/BoardsList/BoardList';

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
