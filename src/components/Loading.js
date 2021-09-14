import React from "react";
import styles from "@/styles/Loading.module.css";

const Loading = () => (
  <>
    <div className={styles.spinner} height="100px">
      <div className={`${styles.blob} ${styles.top}`} />
      <div className={`${styles.blob} ${styles.bottom}`} />
      <div className={`${styles.blob} ${styles.left}`} />

      <div className={`${styles.blob} ${styles.moveBlob}`} />
    </div>
  </>
);

export default Loading;
