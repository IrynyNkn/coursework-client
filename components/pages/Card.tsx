import React from "react";
import styles from "../../styles/pages/home/Card.module.scss";
import { useRouter } from "next/router";

const Card = () => {
  const router = useRouter();

  return (
    <div className={styles.card} onClick={() => router.push("/game")}>
      <div className={styles.imgBox}>
        <img alt="cyberpunk" src="/imgs/cyberpunk.webp" />
      </div>
      <div className={styles.infoSection}>
        <p className={styles.name}>Cyberpunk</p>
        <p className={styles.info}>
          <span>Mode:</span> Single-player video game
        </p>
        <p className={styles.info}>
          <span>Genres:</span> Role-playing Video Game, Adventure game, Shooter
          Video Game, Fighting game
        </p>
      </div>
    </div>
  );
};

export default Card;
