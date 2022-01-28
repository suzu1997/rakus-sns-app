import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import { ReviewCard } from "../../../components/Lunch/ReviewCard";
import { CommentList } from "../../../components/Lunch/CommentList";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { LunchReview } from "../../../types/type";
import { loginIdContext } from "../../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../../utils/const";

/**
 * レビュー詳細を表示するページ.
 *
 * @returns レビュー詳細を表示する画面
 */
const ReviewDetail: NextPage = () => {
  const router = useRouter();

  // レビューIDをURLから取得
  const reviewId = Number(router.query.id);

  // ログインユーザーのハッシュ値
  const { hash } = useContext(loginIdContext);

  // データ取得
  const { data, error, mutate } = useSWR(
    `${JAVA_API_URL}/review/detail/${reviewId}/${hash}`,
  );

  if (!error && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  // レビュー情報をデータから抽出
  const review: LunchReview = data.review;

  // レビューに対するコメント一覧をデータから抽出
  const commentList = data.commentList;

  return (
    <div className="flex">
      <div className="flex-1">
        <SubHeader title="レビュー詳細" />
        <div
          className="cursor-pointer ml-5 mt-2"
          onClick={() => {
            router.back();
          }}
        >
          ←戻る
        </div>
        {review && (
          <>
            <ReviewCard {...review} type="詳細" hasRestaurantInfo={true} />
            {/* コメント部分 */}
            <div className="w-full">
              <CommentList commentList={commentList} success={mutate} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
