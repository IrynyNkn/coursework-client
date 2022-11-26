import React from "react";
import styles from "/styles/pages/game/GameInfo.module.scss";

const GameInfo = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.gameTitle}>Cyberpunk: Edge Runner</h1>
      <dl className={styles.description}>
        <dt className={styles.label}>Genre</dt>
        <dd className={`${styles.data} ${styles.dataBox}`}>
          <div className={styles.tag}>Fantasy</div>
          <div className={styles.tag}>Thriller</div>
        </dd>
        <dt className={styles.label}>Publisher</dt>
        <dd className={`${styles.data} ${styles.dataBox}`}>
          <div className={styles.tag}>Nintendo</div>
        </dd>
        <dt className={styles.label}>Platforms</dt>
        <dd className={`${styles.data} ${styles.dataBox}`}>
          <div className={styles.tag}>PC Download</div>
          <div className={styles.tag}>Mobile</div>
        </dd>
        <dt className={styles.label}>Release Year</dt>
        <dd className={`${styles.data} ${styles.value}`}>2022</dd>
        <dt className={styles.label}>Age Restrictions</dt>
        <dd className={styles.data}>
          <span className={styles.ageBox}>18+</span>
        </dd>
      </dl>
    </div>
  );
};

export default GameInfo;
