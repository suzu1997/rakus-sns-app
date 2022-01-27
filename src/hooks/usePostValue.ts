import { useState } from "react";

/**
 * タイムラインつぶやき用hook.
 * @returns
 */
export const usePostValue = () => {
  //入力テキストの内容を格納するstate
  const [post, setPost] = useState<string>("");

  return { post, setPost };
};
