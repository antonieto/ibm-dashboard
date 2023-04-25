import React from "react";
import styles from "@/styles/IbmButton.module.css";

interface Props {
  text: string;
}

export default function IbmButton({ text }: Props) {
  return (
    <button className={styles.buttonContainer} type="button">
      {text}
    </button>
  );
}
