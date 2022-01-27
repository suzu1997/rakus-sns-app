import { useCallback, useState } from "react";

/**
 * テキストエリアデータ取得用hook.
 * @returns
 */
export const usePostValue = () => {
  //入力テキストの内容を格納するstate
  const [post, setPost] = useState<string>("");

  /**
   * 入力テキストの内容をstateに格納する.
   */
  const inputPost = useCallback((e) => {
    setPost(e.target.value);
  }, []);

  return { post, setPost, inputPost };
};
