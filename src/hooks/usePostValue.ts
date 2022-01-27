import { useCallback, useEffect, useState } from "react";

/**
 * テキストエリアデータ取得用hook.
 * @returns
 */
export const usePostValue = (starOptions: any) => {
  //入力テキストの内容を格納するstate
  const [post, setPost] = useState<string>("");

  //入力テキスト残り文字数
  const [postLength, setPostLength] = useState<number>(0);

  // 選択した星の数を格納するstate
  const [star, setStar] = useState(starOptions[0]);

  /**
   * リアルタイムに文字数をカウントしてくれる.
   */
  useEffect(() => {
    setPostLength(140 - post.length);
  }, [post.length]);

  /**
   * 入力テキストの内容をstateに格納する.
   */
  const inputPost = useCallback((e) => {
    setPost(e.target.value);
  }, []);

  return { post, setPost, inputPost, postLength, star, setStar };
};
