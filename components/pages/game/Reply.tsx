import React, { useEffect, useRef, useState } from "react";
import styles from "/styles/pages/game/Reply.module.scss";
import UserBadge from "../../common/UserBadge";

type ReplyPropsType = {
  isReply?: boolean;
  close?: () => void;
  parentReplyOwner?: string;
};

const Reply = ({
  isReply = false,
  parentReplyOwner,
  close,
}: ReplyPropsType) => {
  const ref = useRef<any>(null);
  const parentReplyOwnerRef = useRef<any>(null);
  const [showButtons, setShowButtons] = useState<boolean>(isReply);
  const [showInput, setShowInput] = useState<boolean>(false);
  const isNested = !!parentReplyOwner;

  useEffect(() => {
    if (isReply) {
      ref?.current?.focus();
    }
  }, []);

  useEffect(() => {
    setShowInput(true);
  }, [parentReplyOwnerRef?.current]);

  useEffect(() => {
    if (isReply && parentReplyOwner) {
      ref?.current?.focus();
    }
  }, [showInput]);

  const cancelComment = () => {
    ref.current.textContent = "";
    if (isReply && close) {
      close();
    } else {
      setShowButtons(false);
    }
  };

  return (
    <div className={styles.replyBox}>
      <UserBadge size={isReply ? "small" : "large"} badgeColor={"#9cadce"} />
      <div className={styles.commentContainer}>
        {isNested && (
          <span className={styles.parentReplyOwner} ref={parentReplyOwnerRef}>
            @{parentReplyOwner}
          </span>
        )}
        {(!parentReplyOwner || showInput) && (
          <div
            ref={ref}
            contentEditable
            placeholder={"Add a comment..."}
            className={styles.commentInput}
            onFocus={() => setShowButtons(true)}
            style={{
              paddingLeft: isNested
                ? parentReplyOwnerRef?.current?.offsetWidth + 6
                : 0,
            }}
          />
        )}
        <div className={styles.btnsWrapper}>
          {showButtons && (
            <>
              <button className={styles.commentBtn}>Comment</button>
              <button onClick={cancelComment} className={styles.cancelBtn}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
