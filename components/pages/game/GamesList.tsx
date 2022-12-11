import React from 'react';
import styles from "/styles/pages/home/Home.module.scss";
import Card from "../Card";

type GamesListPropsType = {
  games: any[]
}

const GamesList = ({games}: GamesListPropsType) => {
  return (
    <div className={styles.gamesList}>
      {
        games.map(game => (
          <Card />
        ))
      }
    </div>
  );
};

export default GamesList;