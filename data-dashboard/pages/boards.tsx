/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IbmButton, IbmSearchBar, BoardList } from '@/lib/components';
import TopLayout from '@/lib/components/TopLayout/TopLayout';
import { NextPageWithLayout } from './_app';
import trpc from '@/lib/hooks/trpc';
import { Board } from '@/server/models';

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

function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const { data, isLoading } = trpc.boards.getBoards.useQuery();
  const { mutate: createBoard } = trpc.boards.createBoard.useMutation({
    onSuccess: (res) => {
      console.log('Board created succesfully: ', res);
      const board = {
        ...res.board,
        createdAt: new Date(res.board.createdAt),
      };
      setBoards([...boards, board]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data) {
      const boards = data.boards.map((board) => {
        return {
          ...board,
          createdAt: new Date(board.createdAt),
        };
      });
      setBoards(boards);
    }
  }, [data]);

  const handleCreateBoard = () => {
    createBoard({
      title: 'New Board',
    });
  };

  return (
    <BoardContainer>
      <BoardsContainerContent>
        <BoardsBarContainer>
          <BoardBarContainerButton>
            <IbmButton text="Crear un tablero" onClick={handleCreateBoard} />
          </BoardBarContainerButton>
          <IbmSearchBar placeholder="Search" />
        </BoardsBarContainer>

        {isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <BoardList boards={boards} />
        )}
      </BoardsContainerContent>
    </BoardContainer>
  );
}

const BoardsPage: NextPageWithLayout = Boards;
BoardsPage.getLayout = (page) => (
  <TopLayout>
    {page}
  </TopLayout>
);

export default BoardsPage;
