import styled from 'styled-components';
import BoardPreview from '../BoardPreview/BoardPreview';
import { MOCK_BOARD_LIST } from './MOCK_BOARD_LIST';

const BoardListContainer = styled.div`
  width: 100%;
`;

const BoardListLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #8d8d8d;
  border: none;
`;

const BoardListComponent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export default function BoardList(): JSX.Element {
  const boards = MOCK_BOARD_LIST;

  return (
    <BoardListContainer>
      <div>
        <h3>Tableros</h3>
        <BoardListLine />
      </div>
      <BoardListComponent>
        {boards.map((board) => (
          <BoardPreview key={board.id} name={board.name} />
        ))}
      </BoardListComponent>
    </BoardListContainer>
  );
}
