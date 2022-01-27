import axios from "axios";
import { title } from "process";
import { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";
import { loginIdContext } from "../providers/LoginIdProvider";
import { JAVA_API_URL } from "../utils/const";

/**
 * テキストエリアデータ取得用hook.
 * @returns
 */
export const useTimelineCommentPost = () => {
  // ログイン中のユーザーidを取得
  const { hash } = useContext(loginIdContext);

  /**
   * タイムライン投稿用hook.
   * @param post - 投稿内容
   * @param success - 成功時にデータ更新用メソッド
   * @returns タイムライン投稿メソッド
   */
  const timelineCommentPost = async (
    postId: number,
    post: string,
    success: () => void,
  ) => {
    if (post === "") {
      alert("入力して下さい");
      return;
    }
    if (post.length > 140) {
      alert(`${title}は140文字以内にして下さい`);
      return;
    }

    try {
      const res = await axios.post(`${JAVA_API_URL}/timeline/comment`, {
        userLogicalId: hash, //ログインユーザＩＤ
        sentence: post, //投稿内容
        timelineId: postId, //投稿ＩＤ
      });
      if (res.data.status === "success") {
        toast.success("コメントを登録しました");
        success();
      }
    } catch {
      toast.error("コメントの投稿に失敗しました");
    }
  };

  return { timelineCommentPost };
};
