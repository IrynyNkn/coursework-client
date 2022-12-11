import React from 'react';
import Layout from "../components/common/Layout";
import styles from "/styles/pages/games-management/GamesManagement.module.scss";

const GamesManagement = () => {
  return (
    <Layout>
      <div className={'wrapper'}>
        <div className={styles.headerBox}>
          <h1 className={styles.title}>Games List</h1>
          <button className={styles.addBtn}>Add Game</button>
        </div>
      </div>
    </Layout>
  );
};

export default GamesManagement;