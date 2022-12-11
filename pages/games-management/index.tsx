import React from 'react';
import Layout from "../../components/common/Layout";
import styles from "/styles/pages/games-management/GamesManagement.module.scss";
import {useRouter} from "next/router";
import Table from "../../components/common/Table";

const GamesManagement = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className={'wrapper'}>
        <div className={styles.headerBox}>
          <h1 className={styles.title}>Games List</h1>
          <button
            className={'green-button'}
            onClick={() => router.push('/games-management/add')}
          >Add Game</button>
        </div>
        <Table />
      </div>
    </Layout>
  );
};

export default GamesManagement;