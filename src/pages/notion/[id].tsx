import { useContext } from "react";
import { NextPage } from "next";

import { SubHeader } from "../../components/Layout/SubHeader";
import { Button } from "../../components/Button/Button";
import { LikeNotion } from "../../components/Notion/LikeNotion";
import { ReviewNotion } from "../../components/Notion/ReviewNotion";
import { TimelineNotion } from "../../components/Notion/TimelineNotion";
import { loginIdContext } from "../../providers/LoginIdProvider";
import type { notion } from "../../types/type";
import { useSWRNotion } from "../../hooks/useSWRNotion";

/**
 * 通知ページ.
 * @remarks ログインしているユーザのIDをAPIで送って、該当の情報を取得
 * @returns 通知が見れるページ
 */
const Notion: NextPage = () => {
  //ログインID
  const { hash } = useContext(loginIdContext);

  // 投稿一覧を再検証・再取得する関数をhooksから取得
  const { data, error, loadMoreNotion, isLast } = useSWRNotion(hash);

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
      {data &&
        data.map((pageData) =>
          pageData?.notificationList.map((value: notion) => {
            return (
              <div key={value.id} className="border border-t-0 border-gray-200">
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
                    url={`/timeline/${value.parentCommentId}`}
                  />
                )}
              </div>
            );
          }),
        )}
      {!isLast ? (
        <div
          className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
          onClick={loadMoreNotion}
        >
          過去の投稿を見る…
        </div>
      ) : (
        <div className="text-text-brown text-center my-5 ">
          最後まで読み込みました
        </div>
      )}
    </>
  );
};
export default Notion;
