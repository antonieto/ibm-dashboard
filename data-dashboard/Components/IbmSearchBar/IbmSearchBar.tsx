import styles from "@/styles/IbmSearchBar.module.css";

interface Props {
  placeholder: string;
}

export default function IbmSearchBar({ placeholder }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.ibmSearchbarContainer}
    />
  );
}
