import { memo, FC, useCallback, useState } from "react";
import { PostModal } from "../Modal/PostModal";

export const PostBtn: FC = memo(() => {
  // レビュー投稿のモーダルのオープン状態
  const [isPostOpen, setPostIsOpen] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const openPostModal = useCallback(() => {
    setPostIsOpen(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const closePostModal = useCallback(() => {
    setPostIsOpen(false);
  }, []);

  return (
    <>
      {isPostOpen ? (
        <PostModal
          isOpen={isPostOpen}
          closeModal={closePostModal}
          title={"つぶやき"}
        />
      ) : (
        <div className="fixed bottom-20 right-10">
          <button
            type="button"
            className="rounded-full text-white bg-basic w-10 h-10 shadow-lg"
            onClick={openPostModal}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}
    </>
  );
});
