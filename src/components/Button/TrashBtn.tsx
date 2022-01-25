import { FC, memo, useCallback, useState } from "react";
import { DeletePostModal } from "../Modal/DeletePostModal";

type Props = {
  postId?: number; //投稿番号
  type?: string; //レビューかタイムラインか
  success?: () => void; //削除成功後にデータ再読み込み
};

/**
 * つぶやきを削除するボタン.
 */
export const TrashBtn: FC<Props> = memo((props) => {
  //削除対象の投稿番号
  const { postId = 0, type, success } = props;

  // レビュー投稿のモーダルのオープン状態
  const [isPostOpen, setPostIsOpen] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const openDeleteModal = useCallback(() => {
    setPostIsOpen(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const closeDeleteModal = useCallback(() => {
    setPostIsOpen(false);
  }, []);

  return (
    <>
      <DeletePostModal
        closeModal={closeDeleteModal}
        isOpen={isPostOpen}
        postId={postId}
        type={type}
        success={success}
      />
      <button type="button" className="pr-10" onClick={openDeleteModal}>
        <i className="fas fa-trash-alt text-gray-500 hover:text-blue-500"></i>
      </button>
    </>
  );
});
