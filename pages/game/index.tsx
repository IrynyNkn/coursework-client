import React from "react";
import Layout from "../../components/common/Layout";
import styles from "/styles/pages/game/Game.module.scss";
import GameRating from "../../components/pages/game/GameRating";
import GameInfo from "../../components/pages/game/GameInfo";
import Comments from "../../components/pages/game/Comments";

const GamePage = () => {
  return (
    <Layout>
      <div className={styles.gameWrapper}>
        <div className={styles.container}>
          <div className={styles.imageBox}>
            <img
              className={styles.gameImage}
              src="/imgs/cyberpunk.webp"
              alt="game-pic"
            />
            <GameRating />
          </div>
          <GameInfo />
        </div>
        <p className={styles.gameDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempor
          laoreet turpis, vitae iaculis massa maximus blandit. Proin ut luctus
          lectus. Cras tincidunt feugiat purus eu ullamcorper. Integer sodales,
          ex ut sodales mattis, nibh neque hendrerit nisl, bibendum mollis ipsum
          justo nec erat. Phasellus pellentesque nibh ut libero convallis, ac
          eleifend enim dictum. Aenean elit velit, ultricies vitae venenatis at,
          tristique vitae lectus. Phasellus luctus metus auctor, tincidunt nisi
          eu, efficitur metus. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Nullam nec tristique arcu.
          Nulla dolor sapien, tincidunt eget consequat et, pulvinar in nibh.
          Morbi rhoncus, odio ut tincidunt viverra, lacus sapien laoreet eros,
          faucibus ullamcorper nisi quam a nisl. Sed sollicitudin id dolor eget
          sagittis. Aenean tristique justo consequat metus sagittis molestie.
          Nullam porttitor dapibus blandit. Sed vitae ex dolor. Donec venenatis
          tortor quis risus fringilla, eget varius nibh ornare. Duis fermentum
          ex ut tincidunt gravida. Curabitur ac aliquet ex, at pulvinar orci.
        </p>
        <Comments />
      </div>
    </Layout>
  );
};

export default GamePage;
