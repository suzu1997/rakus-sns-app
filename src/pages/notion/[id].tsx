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

  console.dir("通知" + JSON.stringify(data.notificationList[0]));

  if (!error && !data) {
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
      {notificationList.map((value, key) => (
        <div style={style} key={key}>
          <div
            className="p-5 ml-10"
            onClick={() => {
              goDetailPage(value.id);
            }}
          >
            <div className="flex">
              {value.like && (
                <span className="text-2xl text-red-500 mt-10">
                  <i className="fas fa-heart"></i>
                </span>
              )}
              {value.comment && (
                <span className="text-3xl text-yellow-600 mt-10">
                  <i className="fas fa-comment"></i>
                </span>
              )}
              <span
                className="ml-3 cursor-pointer hover:opacity-50"
                onClick={() => {
                  goUserPage(value.userId);
                }}
              >
                <Image
                  src={`/image/userIcon/${value.userPhotoPath}`}
                  width={100}
                  height={100}
                  alt="icon"
                  className="rounded-full"
                />
              </span>
            </div>
            <div className=" cursor-pointer hover:opacity-50">
              <div className="text-xl pt-3 pb-3 ml-16">
                {value.accountName}さんがあなたの投稿にいいねしました
              </div>
              <div className="pt-5 pb-5 pl-5 w-8/12 ml-20 text-text-brown">
                {value.timelineSentence}
              </div>
            </div>
          </div>
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
