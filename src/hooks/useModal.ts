import { useCallback, useState } from "react";

/**
 * モーダルを開け閉めできるhook.
 * @returns
 */
export const useModal = () => {
  // レビュー投稿のモーダルのオープン状態
  const [modalStatus, setModalStatus] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const openModal = useCallback((e) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    setModalStatus(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const closeModal = useCallback(() => {
    setModalStatus(false);
  }, []);

  return { modalStatus, openModal, closeModal };
};
