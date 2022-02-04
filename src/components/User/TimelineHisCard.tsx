import { FC, memo } from "react";
import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";

import { loginIdContext } from "../../providers/LoginIdProvider";
import type { Timeline } from "../../types/type";
import { CommentIcon } from "../Button/CommentIcon";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { JAVA_API_URL } from "../../utils/const";
import { getFormattedDate } from "../../utils/methods";

type Props = Timeline & {
  type: string;
};

/**
 * タイムライン履歴を表示するカードコンポーネント
 */
export const TimelineHisCard: FC<Props> = memo((props) => {
  const {
    id,
    userId,
    accountName,
    userPhotoPath,
    sentence,
    likeCount,
    commentCount,
    postedTime,
    myLike,
  } = props;

  //ログインID
  const { loginId } = useContext(loginIdContext);
  const { hash } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

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
    (postId: number) => {
      router.push(`/timeline/${postId}`);
      // router.push(`/lunch/review/${postId}`);
    },
    [router],
  );

  /**
   * APIで初期表示用データ取得.
   */
  const { mutate } = useSWR(`${JAVA_API_URL}/user/${userId}/${hash}`);

  /**
   * 履歴表示一覧の情報を更新するメソッド.
   *
   * @remarks
   * 成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    mutate(); // 履歴一覧を再検証・再取得する
  }, [mutate]);

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
          つぶやき日時:
          {getFormattedDate(new Date(postedTime))}
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
          {sentence}
        </span>
      </div>
      <div className="w-full text-right py-3">
        <CommentIcon
          commentCount={commentCount}
          postId={id}
          success={updateData}
          title="つぶやきへのコメント"
        />
        <FavoBtn
          postId={id}
          favoCount={likeCount}
          isFavo={myLike}
          type="タイムライン"
          success={updateData}
        />
        {Number(loginId) === userId && (
          <TrashBtn postId={id} type="タイムライン" success={updateData} />
        )}
      </div>
    </div>
  );
});
