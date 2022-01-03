/**
 * コメント追加ボタン
 * @remarks コメント数を渡してあげる
 */
import { FC, memo } from "react";

const comment = () => {
  console.log("コメント");
};

export type Props = {
  commentCount: number;
};

export const CommentIcon: FC<Props> = memo((props) => {
  return (
    <>
      <button type="button" className="pr-10" onClick={comment}>
        <i className="fas fa-comment text-gray-500 hover:text-yellow-600"></i>
        {props.commentCount}
      </button>
    </>
  );
});
