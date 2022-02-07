import { FC, memo } from "react";
import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import { loginIdContext } from "../../providers/LoginIdProvider";
import type { CommentHis } from "../../types/type";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { JAVA_API_URL } from "../../utils/const";
import { getFormattedDate } from "../../utils/methods";

/**
 * いいねコメント履歴を表示するコンポーネント
 */
export const LikedCommentHis: FC<CommentHis> = memo((props) => {
  const {
    id,
    userId,
    accountName,
    userPhotoPath,
    comment,
    commentLikeCount,
    actionedTime,
    myLike,
  } = props;

  //ログインID
  const { loginId } = useContext(loginIdContext);
  const { hash } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  //useSWRConfig() フックから mutate 関数を取得
  const { mutate } = useSWRConfig();

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = useCallback(
    (userId: number) => {
      router.push(`/user/${userId}`);
    },
    [router],
  );

  /**
   * 押下投稿の詳細に画面遷移.
   * @remarks 受け取った記事IDの詳細画面に遷移
   */
  const goDetailTimelinePage = useCallback(
    async (id: number) => {
      //APIを使用して遷移先を判断
      try {
        const res = await axios.get(`${JAVA_API_URL}/comment/${id}/${hash}`);
        //メッセージ内容
        const responseMessage = res.data.message;
        if (
          responseMessage ===
          "このコメントがあるタイムライン詳細の検索に成功しました"
        ) {
          router.push(`/timeline/${res.data.timeline.id}`);
        } else if (
          //レビューのコメントに対するいいね
          responseMessage ===
          "このコメントがあるレビュー詳細の検索に成功しました"
        ) {
          router.push(`/lunch/review/${res.data.review.id}`);
        } else {
          toast.error(responseMessage);
        }
      } catch (e) {
        toast.error("投稿が見つかりませんでした。");
      }
    },
    [hash, router],
  );

  /**
   * 履歴表示一覧の情報を更新するメソッド.
   *
   * @remarks
   * 成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    mutate(`${JAVA_API_URL}/user/${userId}/${hash}`); // 履歴一覧を再検証・再取得する
  }, [hash, mutate, userId]);

  return (
    <div
      key={id}
      className=" border border-t-1 mt-1 border-blue-100text-sm font-medium leading-5 focus:outline-none rounded-xl bg-white relative p-3 "
    >
      <div
        className="hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
        onClick={() => {
          goDetailTimelinePage(id);
        }}
      >
        <span className="text-xl font-extrabold pt-3 pb-3">{accountName}</span>
        <span className="ml-7">
          コメント日時:
          {getFormattedDate(new Date(actionedTime))}
        </span>
      </div>
      <div className="flex">
        <span
          className="rounded-full  pt-5 cursor-pointer hover:opacity-50"
          onClick={() => {
            goUserPage(userId);
          }}
        >
          <Image
            src={`/image/userIcon/${userPhotoPath}`}
            width={100}
            height={100}
            alt="icon"
            className="rounded-full"
          />
        </span>
        <span
          className="p-10 w-8/12 hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
          onClick={() => {
            goDetailTimelinePage(id);
          }}
        >
          {comment}
        </span>
      </div>
      <div className="w-full text-right py-3">
        <FavoBtn
          postId={id}
          favoCount={commentLikeCount}
          isFavo={myLike}
          type="いいね履歴コメント"
          success={updateData}
        />
        {Number(loginId) === userId && (
          <TrashBtn
            postId={id}
            type="いいね履歴コメント"
            success={updateData}
          />
        )}
      </div>
    </div>
  );
});
