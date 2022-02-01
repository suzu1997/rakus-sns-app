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
import { LikeNotion } from "../../components/Notion/LikeNotion";
import { ReviewNotion } from "../../components/Notion/ReviewNotion";
import { TimelineNotion } from "../../components/Notion/TimelineNotion";

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
        notificationList.map((value) => (
          <div key={value.id}>
            {value.timelineId != null && (
              <TimelineNotion notification={value} />
            )}
            {value.reviewId && <ReviewNotion notification={value} />}
            {value.parentCommentId != null && (
              <LikeNotion
                notification={value}
                type="コメント"
                sentence={value.parentCommentSentence}
              />
            )}
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
