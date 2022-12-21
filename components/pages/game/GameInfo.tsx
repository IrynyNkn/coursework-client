import React from 'react';
import styles from '/styles/pages/game/GameInfo.module.scss';
import { GameDataType } from '../../../utils/types/games';
import { useRouter } from 'next/router';
import useGame from '../../../utils/hooks/useGame';

const GameInfo = () => {
  const router = useRouter();
  const { data: gameData } = useGame(router.query.id as string);

  return (
    <div className={styles.container}>
      <h1 className={styles.gameTitle}>{gameData?.title}</h1>
      <dl className={styles.description}>
        <dt className={styles.label}>Genre</dt>
        <dd className={`${styles.data} ${styles.dataBox}`}>
          {gameData?.genres ? (
            gameData.genres.map((genre) => (
              <div className={styles.tag}>{genre.name}</div>
            ))
          ) : (
            <div>--</div>
          )}
        </dd>
        <dt className={styles.label}>Publisher</dt>
        <dd className={`${styles.data} ${styles.dataBox}`}>
          <div className={styles.tag}>{gameData?.publisher?.name}</div>
        </dd>
        <dt className={styles.label}>Platforms</dt>
        <dd className={`${styles.data} ${styles.dataBox}`}>
          {gameData?.platforms ? (
            gameData.platforms.map((plt) => (
              <div className={styles.tag}>{plt.name}</div>
            ))
          ) : (
            <div>--</div>
          )}
        </dd>
        <dt className={styles.label}>Release Year</dt>
        <dd className={`${styles.data} ${styles.value}`}>
          {gameData?.releaseYear}
        </dd>
        <dt className={styles.label}>Age Restrictions</dt>
        <dd className={styles.data}>
          <span className={styles.ageBox}>{gameData?.ageRestriction}+</span>
        </dd>
      </dl>
    </div>
  );
};

export default GameInfo;
