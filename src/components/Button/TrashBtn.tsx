import { FC, memo, useCallback, useState } from "react";
import { DeletePostModal } from "../Modal/DeletePostModal";

/**
 * つぶやきを削除するボタン.
 */
export const TrashBtn: FC = memo(() => {
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
      <DeletePostModal closeModal={closeDeleteModal} isOpen={isPostOpen} />
      <button type="button" className="pr-10" onClick={openDeleteModal}>
        <i className="fas fa-trash-alt text-gray-500 hover:text-blue-500"></i>
      </button>
    </>
  );
});
