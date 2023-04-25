import styles from "@/styles/BoardList.module.css";
import BoardPreview from "../BoardPreview/BoardPreview";

export default function BoardList() {
  const boards = [
    {
      id: "1",
      name: "Tablero 1",
    },
    {
      id: "2",
      name: "Tablero 2",
    },
    {
      id: "3",
      name: "Tablero 3",
    },
    {
      id: "4",
      name: "Tablero 4",
    },
    {
      id: "5",
      name: "Tablero 5",
    },
  ];

  return (
    <div className={styles.boardListContainer}>
      <div className={styles.boardListHeader}>
        <h3>Tableros</h3>
        <hr className={styles.hr} />
      </div>
      <div className={styles.boardList}>
        {boards.map((board) => (
          <BoardPreview key={board.id} id={board.id} name={board.name} />
        ))}
      </div>
    </div>
  );
}
