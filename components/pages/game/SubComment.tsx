import React, { useMemo } from 'react';
import styles from '/styles/pages/game/Comments.module.scss';
import UserBadge from '../../common/UserBadge';
import { BsSuitHeartFill } from 'react-icons/bs';
import { CommentType } from '../../../utils/types/games';
import { proxyUrl } from '../../../utils/consts';
import { toast } from 'react-toastify';
import { authTokenName } from '../../../utils/auth';
import useGame from '../../../utils/hooks/useGame';
import { useRouter } from 'next/router';
import getCookies from '../../../utils/getCookies';

type SubCommentPropsType = {
  isReply?: boolean;
  enableReply: () => void;
  commentData: CommentType | null;
  currentUserId: string;
};

const SubComment = ({
  isReply = false,
  enableReply,
  commentData,
  currentUserId,
}: SubCommentPropsType) => {
  const router = useRouter();
  const { refetch } = useGame(router.query.id as string);

  const commentHasLike = useMemo<boolean>(() => {
    if (!commentData?.commentLikes || !currentUserId) {
      return false;
    }
    return !!commentData.commentLikes.find(
      (like) => like.userId === currentUserId
    );
  }, [commentData, currentUserId]);

  const likeComment = async () => {
    const reqBody = {
      userId: currentUserId,
      commentId: commentData?.id,
    };
    const accessToken = getCookies(authTokenName);
    try {
      const response = await fetch(`${proxyUrl}/comments/likes`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'POST',
        body: JSON.stringify(reqBody),
      });
      const result = await response.json();

      if (!result.error) {
        toast.success(result.message);
        refetch();
      } else {
        toast.error(result.message);
      }
    } catch (e) {
      console.log('Error while leaving a comment', e);
      toast.error('Something went wrong :(');
    }
  };

  const deleteLike = async () => {
    const likeId = commentData?.commentLikes.find(
      (like) => like.userId === currentUserId
    )?.id;
    const accessToken = getCookies(authTokenName);
    if (likeId) {
      try {
        const response = await fetch(`${proxyUrl}/comments/likes/${likeId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          method: 'DELETE',
        });
        const result = await response.json();

        if (!result.error) {
          toast.success(result.message);
          refetch();
        } else {
          toast.error(result.message);
        }
      } catch (e) {
        console.log('Error while leaving a comment', e);
        toast.error('Something went wrong :(');
      }
    }
  };

  const onLikeClick = async () => {
    if (commentHasLike) {
      await deleteLike();
    } else {
      await likeComment();
    }
  };

  return (
    <div className={styles.flexBox}>
      <UserBadge
        size={isReply ? 'small' : 'large'}
        badgeColor={commentData?.user?.badgeColor || '#49c5b6'}
      />
      <div className={styles.commentBody}>
        <div className={styles.userInfoBox}>
          <p className={styles.userName}>{commentData?.user?.userName}</p>
          <p className={styles.timeStamp}>3 days ago</p>
        </div>
        <p>
          {commentData?.replyUserMention && (
            <span className={styles.userMention}>
              @{commentData?.replyUserMention}
            </span>
          )}
          {commentData?.value}
        </p>
        <div className={styles.actionsPanel}>
          <button className={styles.replyBtn} onClick={enableReply}>
            Reply
          </button>
          <div
            className={`${styles.likeWrapper} ${
              commentHasLike ? styles.active : ''
            }`}
            onClick={onLikeClick}>
            <BsSuitHeartFill size={20} />
            <p className={styles.likesCount}>
              {commentData?.commentLikes?.length || ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubComment;
