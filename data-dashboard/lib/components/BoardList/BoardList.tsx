import styled from 'styled-components';
import { Board } from '@/server/models';
import BoardPreview from '../BoardPreview/BoardPreview';

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

interface Props {
  boards: Board[];
}

export default function BoardList({ boards }: Props): JSX.Element {
  return (
    <BoardListContainer>
      <div>
        <h3>Tableros</h3>
        <BoardListLine />
      </div>
      <BoardListComponent>
        {boards.map((board) => (
          <BoardPreview imgSrc={board.previewImg} key={board.boardId} name={board.title} id={board.boardId} />
        ))}
      </BoardListComponent>
    </BoardListContainer>
  );
}
