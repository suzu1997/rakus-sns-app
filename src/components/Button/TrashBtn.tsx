import { FC, memo, useCallback, useState } from "react";
import { DeletePostModal } from "../Modal/DeletePostModal";

type Props = {
  postId?: number;
};

/**
 * つぶやきを削除するボタン.
 */
export const TrashBtn: FC<Props> = memo((props) => {
  //削除対象の投稿番号
  const { postId = 0 } = props;

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
      />
      <button type="button" className="pr-10" onClick={openDeleteModal}>
        <i className="fas fa-trash-alt text-gray-500 hover:text-blue-500"></i>
      </button>
    </>
  );
});
