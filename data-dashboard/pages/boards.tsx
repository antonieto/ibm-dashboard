/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { IbmButton, IbmSearchBar, BoardList } from '@/lib/components';
import TopLayout from '@/lib/components/TopLayout/TopLayout';
import trpc from '@/lib/hooks/trpc';
import { Board } from '@/server/models';
import BoardTitleModal from '@/lib/components/BoardTitleModal/BoardTitleModal';
import { NextPageWithLayout } from './_app';

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
  const router = useRouter();

  const [boards, setBoards] = useState<Board[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, isLoading } = trpc.boards.getBoards.useQuery();
  const { mutate: createBoard } = trpc.boards.createBoard.useMutation({
    onSuccess: (res) => {
      console.log('Board created succesfully: ', res);
      const board = {
        ...res.board,
        createdAt: new Date(res.board.createdAt),
      };
      router.push(`boards/${board.boardId}`);
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

  const handleCreateBoard = (title: string) => {
    createBoard({
      title,
    });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <BoardContainer>
      <BoardsContainerContent>
        <BoardsBarContainer>
          <BoardBarContainerButton>
            <IbmButton text="Crear un tablero" onClick={handleOpenModal} />
          </BoardBarContainerButton>
          <IbmSearchBar placeholder="Search" />
        </BoardsBarContainer>

        {isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <BoardList boards={boards} />
        )}
      </BoardsContainerContent>
      <BoardTitleModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleCreateBoard}
      />
    </BoardContainer>
  );
}

const BoardsPage: NextPageWithLayout = Boards;
BoardsPage.getLayout = (page) => <TopLayout>{page}</TopLayout>;

export default BoardsPage;
