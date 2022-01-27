import { FC, memo } from "react";
import { PostModal } from "../Modal/PostModal";
import { useModal } from "../../hooks/useModal";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  commentCount: number;
  postId: number; // 対象の投稿ID
  target: "timeline" | "reviews"; // 対象の投稿がタイムラインかレビューか
  success: () => void; //投稿完了後、自動で更新したい場合は更新のメソッドを渡す
};

/**
 * コメント追加ボタン
 * @remarks コメント数を渡してあげる
 */
export const CommentIcon: FC<Props> = memo((props) => {
  const { commentCount, postId, target, success } = props;

  // モーダル開閉用カスタムフック呼び出し
  const { modalStatus, openModal, closeModal } = useModal();

  return (
    <>
      {/* コメントモーダル */}
      <PostModal
        isOpen={modalStatus}
        closeModal={closeModal}
        title={"コメント"}
        postId={postId}
        target={target}
        success={success}
      />
      <button type="button" className="pr-10 outline none" onClick={openModal}>
        <i className="fas fa-comment text-gray-500 hover:text-yellow-600"></i>
        <span className="pl-1">{commentCount}</span>
      </button>
    </>
  );
});
