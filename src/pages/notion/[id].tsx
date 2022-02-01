import { useContext } from "react";
import { NextPage } from "next";
import useSWR from "swr";

import { SubHeader } from "../../components/Layout/SubHeader";
import { Button } from "../../components/Button/Button";
import { LikeNotion } from "../../components/Notion/LikeNotion";
import { ReviewNotion } from "../../components/Notion/ReviewNotion";
import { TimelineNotion } from "../../components/Notion/TimelineNotion";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";
import { notion } from "../../types/type";

/**
 * 通知ページ.
 * @remarks ログインしているユーザのIDをAPIで送って、該当の情報を取得
 * @returns 通知が見れるページ
 */
const Notion: NextPage = () => {
  //ログインID
  const { hash } = useContext(loginIdContext);

  /**
   * APIで通知データを取得.
   */
  const { data, error } = useSWR(`${JAVA_API_URL}/notifications/${hash}`);
  //通知データの配列
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
            {/* タイムラインに対する反応 */}
            {value.timelineId != null && (
              <TimelineNotion notification={value} />
            )}
            {/* レビューに対する反応 */}
            {value.reviewId && <ReviewNotion notification={value} />}
            {/* コメントに対する反応 */}
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
