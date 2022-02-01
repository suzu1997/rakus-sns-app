import Image from "next/image";
import { useCallback, useContext, useState } from "react";
import { NextPage } from "next";
import { SubHeader } from "../../components/Layout/SubHeader";
import { useRouter } from "next/router";
import { Button } from "../../components/Button/Button";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { notion } from "../../types/type";
import Link from "next/link";

/**
 * 通知ページ.
 * @remarks ログインしているユーザのIDをAPIで送って、該当の情報を取得
 * @returns 通知が見れるページ
 */
const Notion: NextPage = () => {
  //ログインID
  const { hash } = useContext(loginIdContext);

  //1人1人のつぶやきの下に入る線
  const style = {
    borderBottom: "solid 1px black",
  };

  //ルーターリンク
  const router = useRouter();
  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = useCallback((userId: number) => {
    router.push(`/user/${userId}`);
  }, []);

  /**
   * 投稿クリックで投稿詳細ページに飛ぶ.
   * @param postId - 投稿ID
   */
  const goDetailPage = useCallback(
    (postId: number) => {
      if (postId > 100) {
        router.push(`/timeline/${postId}`);
      } else {
        router.push(`/lunch/review/${postId}`);
      }
    },
    [router],
  );

  const { data, error } = useSWR(`${JAVA_API_URL}/notifications/${hash}`);
  const notificationList: Array<notion> = data?.notificationList;

  if (!error && !notificationList) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="通知" />

      <div className="text-center my-10">
        <Button
          label="新しい通知を読み込む"
          size="lg"
          onClick={() => {
            alert("新しい通知読み込み");
          }}
        />
      </div>

      {/* タイムラインゾーン */}
      {notificationList &&
        notificationList.map((value, key) => (
          <div style={style} key={key} className="p-5 ml-10">
            <Link href={`/user/${value.id}`}>
              <a>
                <div className="flex">
                  {/* いいねの場合ハートを表示 */}
                  {value.like && (
                    <span className="text-2xl text-red-500 mt-10">
                      <i className="fas fa-heart"></i>
                    </span>
                  )}
                  {/* コメントの場合ふきだしを表示 */}
                  {value.comment && (
                    <span className="text-3xl text-yellow-600 mt-10">
                      <i className="fas fa-comment"></i>
                    </span>
                  )}
                  <span className="ml-3 cursor-pointer hover:opacity-50">
                    <Link href={`/user/${value.userId}`}>
                      <a>
                        <Image
                          src={`/image/userIcon/${value.userPhotoPath}`}
                          width={100}
                          height={100}
                          alt="icon"
                          className="rounded-full"
                        />
                      </a>
                    </Link>
                  </span>
                </div>
                <div className=" cursor-pointer hover:opacity-50">
                  <div className="text-xl pt-3 pb-3 ml-16">
                    {value.like && (
                      <>
                        {value.accountName}さんがあなたの投稿にいいねしました
                        <div className="pt-5 pb-5 pl-5 w-8/12 ml-20 text-text-brown">
                          {value.reviewSentence}
                          {value.timelineSentence}
                        </div>
                      </>
                    )}
                    {value.comment && (
                      <>
                        {value.accountName}さんがあなたの投稿にコメントしました
                        <div className="py-5 w-8/12 ml-20 text-text-brown">
                          {value.comment}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}

      <div
        className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
        onClick={() => {
          alert("過去の通知読み込み");
        }}
      >
        過去の通知を見る…
      </div>
    </>
  );
};
export default Notion;
