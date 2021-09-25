import styles from "@/styles/Loading.module.css";
import { Paper } from "@material-ui/core";
import React from "react";

const Loading = () => (
  <>
    <Paper
      elevation={6}
      style={{ padding: "10px", margin: "20px", height: "100vh" }}
    >
      <div className={styles.spinner} height="100vh">
        <div className={`${styles.blob} ${styles.top}`} />
        <div className={`${styles.blob} ${styles.bottom}`} />
        <div className={`${styles.blob} ${styles.left}`} />
        <div className={`${styles.blob} ${styles.moveBlob}`} />
      </div>
    </Paper>
  </>
);

export default Loading;
