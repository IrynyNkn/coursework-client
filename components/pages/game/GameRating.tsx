import React, { useState } from "react";
import styles from "/styles/pages/game/GameRating.module.scss";
import { AiFillStar } from "react-icons/ai";

const GameRating = () => {
  const unRatedArr = [false, false, false, false, false];
  const [ratingScore, setRatingScore] = useState<number | null>(null);
  const [stars, setStars] = useState<boolean[]>(unRatedArr);

  const handleHover = (id: number) => {
    const starsArr = [...stars];
    stars.forEach((star, idx) => {
      if (idx <= id) {
        starsArr[idx] = true;
      }
    });
    setStars(starsArr);
  };

  console.log(stars);

  const setScore = () => {
    const score = stars.filter((star) => star).length;
    setRatingScore(score);
  };

  return (
    <div className={styles.ratingBox}>
      {stars.map((star, idx) => (
        <span
          className={`${styles.iconWrapper} ${
            stars[idx] || (ratingScore && idx < ratingScore)
              ? styles.active
              : ""
          }`}
          onMouseEnter={() => handleHover(idx)}
          onMouseLeave={() => setStars(unRatedArr)}
          onClick={setScore}
        >
          <AiFillStar size={32} />
        </span>
      ))}
    </div>
  );
};

export default GameRating;
