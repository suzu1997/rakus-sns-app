import { FC, memo, useCallback, useState } from "react";
import { PostModal } from "../Modal/PostModal";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  title: "タイムラインコメント" | "レビューコメント";
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
  const { commentCount, postId, target, success, title } = props;
  // コメント投稿のモーダルのオープン状態
  const [isCommentOpen, setCommentIsOpen] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const openCommentModal = useCallback((e) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    setCommentIsOpen(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const closeCommentModal = useCallback(() => {
    setCommentIsOpen(false);
  }, []);

  return (
    <>
      {/* コメントモーダル */}
      <PostModal
        isOpen={isCommentOpen}
        closeModal={closeCommentModal}
        title={title}
        postId={postId}
        target={target}
        success={success}
      />
      <button
        type="button"
        className="pr-10 outline none"
        onClick={openCommentModal}
      >
        <i className="fas fa-comment text-gray-500 hover:text-yellow-600"></i>
        <span className="pl-1">{commentCount}</span>
      </button>
    </>
  );
});
