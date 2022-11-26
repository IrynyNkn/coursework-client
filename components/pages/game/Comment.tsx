import React, { useState } from "react";
import styles from "/styles/pages/game/Comments.module.scss";
import UserBadge from "../../common/UserBadge";
import { BsSuitHeartFill } from "react-icons/bs";
import Reply from "./Reply";

const replies = [1, 2, 3];

type SubCommentPropsType = {
  isReply?: boolean;
  enableReply: () => void;
};

const SubComment = ({ isReply = false, enableReply }: SubCommentPropsType) => {
  return (
    <div className={styles.flexBox}>
      <UserBadge size={isReply ? "small" : "large"} badgeColor={"#49c5b6"} />
      <div className={styles.commentBody}>
        <div className={styles.userInfoBox}>
          <p className={styles.userName}>Iry Nkn</p>
          <p className={styles.timeStamp}>3 days ago</p>
        </div>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Pellentesque rutrum venenatis lectus. Vivamus
          tempus sit amet elit id pellentesque. In sagittis tincidunt dictum. In
          consectetur orci non odio lacinia semper ut vel neque. Mauris eu
          turpis ante. Nunc elementum, diam sed accumsan efficitur, metus enim
          fermentum est, id varius felis lectus id tortor. Nam sem felis, auctor
          vel tellus at, sagittis convallis erat. Nulla dapibus at magna id
          sodales. Pellentesque lacinia pulvinar tellus a commodo. Sed viverra
          lacinia justo. Nullam vel tempor nisi. Etiam commodo porta lorem sit
          amet vestibulum. Integer at elementum mauris.
        </p>
        <div className={styles.actionsPanel}>
          <button className={styles.replyBtn} onClick={enableReply}>
            Reply
          </button>
          <div className={styles.likeWrapper}>
            <BsSuitHeartFill size={20} />
            <p className={styles.likesCount}>20</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Comment = () => {
  const [showAllReplies, setShowAllReplies] = useState();
  const [enableReply, setEnableReply] = useState<boolean>(false);
  const [enableNestedReply, setEnableNestedReply] = useState<boolean>(false);

  return (
    <div>
      <SubComment enableReply={() => setEnableReply(true)} />
      <div className={styles.replies}>
        {enableReply && (
          <Reply isReply={true} close={() => setEnableReply(false)} />
        )}
        <SubComment
          enableReply={() => setEnableNestedReply(true)}
          isReply={true}
        />
        {enableNestedReply && (
          <Reply
            isReply={true}
            parentReplyOwner={"user1212"}
            close={() => setEnableNestedReply(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
