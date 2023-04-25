import styles from "@/styles/Boards.module.css";

import IbmButton from "@/Components/IbmButton/IbmButton";
import IbmSearchBar from "@/Components/IbmSearchBar/IbmSearchBar";
import BoardList from "@/Components/BoardsList/BoardList";

export default function boards() {
  return (
    <div className={styles.boardsContainer}>
      <div className={styles.boardsContainerContent}>
        <div className={styles.boardsBarContainer}>
          <div className={styles.boardBarContainer_Button}>
            <IbmButton text="Crear un tablero" />
          </div>
          <IbmSearchBar placeholder="Search" />
        </div>
        <BoardList />
      </div>
    </div>
  );
}
