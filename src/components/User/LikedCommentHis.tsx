import { FC, memo } from "react";

type Props = CommentHis & {
  type: string;
};

/**
 * いいねコメント履歴を表示するコンポーネント
 */
export const LikedCommentHis: FC<Props> = memo((props) => {
  const {
    id,
    userId,
    accountName,
    userPhotoPath,
    comment,
    commentLikeCount,
    actionedTime,
    myLike,
  } = props;

  return (
  );
});
