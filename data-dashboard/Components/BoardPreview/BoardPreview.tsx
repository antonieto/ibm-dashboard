import styles from "@/styles/BoardPreview.module.css";

interface Props {
  id: string;
  name: string;
}
export default function BoardPreview({ id, name }: Props) {
  return (
    <div className={styles.boardPreviewContainer}>
      <div className={styles.boardPreviewContent}>
        <div className={styles.boardPreviewImage}></div>
        <div>
          <p>{name}</p>
        </div>
      </div>
      <hr className={styles.boardPreviewLine} />
    </div>
  );
}
