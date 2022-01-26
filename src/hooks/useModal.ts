import { useCallback, useState } from "react";

/**
 * モーダルを開け閉めできるhook.
 * @returns
 */
export const useModal = () => {
  // レビュー投稿のモーダルのオープン状態
  const [isPostOpen, setPostIsOpen] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const openModal = useCallback((e) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    setPostIsOpen(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const closeModal = useCallback(() => {
    setPostIsOpen(false);
  }, []);

  return { isPostOpen, openModal, closeModal };
};
