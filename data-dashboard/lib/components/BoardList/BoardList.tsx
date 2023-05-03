import trpc from '@/lib/hooks/trpc';
import styled from 'styled-components';
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

export default function BoardList(): JSX.Element {
  const { data, isLoading } = trpc.boards.useQuery();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <BoardListContainer>
      <div>
        <h3>Tableros</h3>
        <BoardListLine />
      </div>
      <BoardListComponent>
        {data.boards.map((board) => (
          <BoardPreview key={board.boardId} name={board.name} />
        ))}
      </BoardListComponent>
    </BoardListContainer>
  );
}
