import React from "react";
import styles from "/styles/pages/game/Comments.module.scss";
import Comment from "./Comment";
import UserBadge from "../../common/UserBadge";
import Reply from "./Reply";

const Comments = () => {
  return (
    <div className={styles.commentsBox}>
      <h2 className={styles.title}>Discussion</h2>
      <Reply />
      <Comment />
    </div>
  );
};

export default Comments;
