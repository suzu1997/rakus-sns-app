import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { ReviewCard } from "../../../components/Lunch/ReviewCard";
import { JAVA_API_URL } from "../../../utils/const";
import { LunchReview } from "../../../types/type";
import { useContext } from "react";
import { loginIdContext } from "../../../providers/LoginIdProvider";
import { CommentList } from "../../../components/Lunch/CommentList";

const ReviewDetail: NextPage = () => {
  const router = useRouter();
  const reviewId = Number(router.query.id);

  const userId = useContext(loginIdContext);

  const { data, error } = useSWR(
    `${JAVA_API_URL}/review/detail/${reviewId}/${userId}`,
  );

  if (!error && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  const review: LunchReview = data.review;

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
              <CommentList commentList={data.commentList}/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
