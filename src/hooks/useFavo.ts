import { useCallback } from "react";
import axios from "axios";
import { JAVA_API_URL } from "../utils/const";
import toast from "react-hot-toast";

/**
 * 投稿へいいねをするためのカスタムフック.
 *
 * @param postId - いいね対象の投稿ID
 * @param type - 何に対するいいねか
 * @param success - いいね成功時の処理
 * @param hash - ユーザーのハッシュ
 * @returns
 * いいねボタンを押した時のメソッド。
 */
export const useFavo = (
  postId: number,
  type: string,
  success: () => void,
  hash: string,
) => {
  /**
   * ボタン押下でいいね発動.
   */
  const favo = useCallback(
    async (e) => {
      // 親要素へのイベントを伝播させない
      e.stopPropagation();
      try {
        if (type === "タイムライン") {
          //タイムラインに対するいいね
          const res = await axios.post(`${JAVA_API_URL}/timeline/like`, {
            timelineId: postId, //投稿ID
            userLogicalId: hash, //ログインユーザID
          });
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          }
        }

        if (type === "タイムラインコメント") {
          const res = await axios.post(
            `${JAVA_API_URL}/timeline/comment/like`,
            {
              commentId: postId, //投稿ID
              userLogicalId: hash, //ログインユーザID
            },
          );
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          }
        }

        if (type === "レビュー") {
          const res = await axios.post(`${JAVA_API_URL}/review/like`, {
            reviewId: postId, //投稿ID
            userLogicalId: hash, //ログインユーザID
          });
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          } else {
            console.log(res.data.message);
          }
        }

        if (type === "レビューコメント") {
          const res = await axios.post(`${JAVA_API_URL}/review/comment/like`, {
            commentId: postId, //投稿ID
            userLogicalId: hash, //ログインユーザID
          });
          if (res.data.status === "success") {
            //リロード
            if (success) {
              success();
            }
          } else {
            console.log(res.data.message);
          }
        }

        if (type === "いいね履歴コメント") {
          try {
            const res = await axios.get(
              `${JAVA_API_URL}/comment/${postId}/${hash}`,
            );
            //メッセージ内容
            const responseMessage = res.data.message;
            //いいねコメントがつぶやきの場合
            if (
              responseMessage ===
              "このコメントがあるタイムライン詳細の検索に成功しました"
            ) {
              const res = await axios.post(
                `${JAVA_API_URL}/timeline/comment/like`,
                {
                  commentId: postId, //投稿ID
                  userLogicalId: hash, //ログインユーザID
                },
              );
              if (res.data.status === "success") {
                //リロード
                if (success) {
                  success();
                }
              }
            }
            //いいねコメントがレビューの場合
            else if (
              responseMessage ===
              "このコメントがあるレビュー詳細の検索に成功しました"
            ) {
              const res = await axios.post(
                `${JAVA_API_URL}/review/comment/like`,
                {
                  commentId: postId, //投稿ID
                  userLogicalId: hash, //ログインユーザID
                },
              );
              if (res.data.status === "success") {
                //リロード
                if (success) {
                  success();
                }
              } else {
                console.log(res.data.message);
              }
            }
          } catch (e) {
            toast.error("投稿が見つかりませんでした。");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [success, hash, postId, type],
  );

  return { favo };
};