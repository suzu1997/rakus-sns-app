import { memo, FC, useCallback, useState } from "react";
import { PostModal } from "../Modal/PostModal";

type Props = {
  success?: () => void; //投稿完了後、自動で更新したい場合は更新のメソッドを渡す
};

export const PostBtn: FC<Props> = memo((props) => {
  const { success } = props;

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
          success={success}
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
