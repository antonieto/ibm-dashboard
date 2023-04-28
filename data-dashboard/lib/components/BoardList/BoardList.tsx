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

export default function BoardList() {
  const boards = [
    {
      id: '1',
      name: 'Tablero 1',
    },
    {
      id: '2',
      name: 'Tablero 2',
    },
    {
      id: '3',
      name: 'Tablero 3',
    },
    {
      id: '4',
      name: 'Tablero 4',
    },
    {
      id: '5',
      name: 'Tablero 5',
    },
  ];

  return (
    <BoardListContainer>
      <div>
        <h3>Tableros</h3>
        <BoardListLine />
      </div>
      <BoardListComponent>
        {boards.map((board) => (
          <BoardPreview key={board.id} id={board.id} name={board.name} />
        ))}
      </BoardListComponent>
    </BoardListContainer>
  );
}
