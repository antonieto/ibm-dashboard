import trpc from '@/lib/hooks/trpc';
import styled from 'styled-components';
import BoardPreview from '../BoardPreview/BoardPreview';
import { Board } from '@/server/models';

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
          <BoardPreview key={board.boardId} name={board.title} />
        ))}
      </BoardListComponent>
    </BoardListContainer>
  );
}
