import { useRouter } from "next/router";
import { FC, memo, useEffect, useState } from "react";
import useSWR from "swr";
import { LunchReview } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { ReviewCard } from "./ReviewCard";

export const ReviewList: FC = memo(() => {
  // レビューカードがレストラン情報を持つかどうか
  const [hasRestaurantInfo, setHasRestaurantInfo] = useState<boolean>(true);
  const router = useRouter();

  // const { data: reviewList, error } = useSWR(
  //   "https://jsonplaceholder.typicode.com/comments/?_limit=10",
  // );
  // useSWRでクライアントフェッチ
  const { data: reviewList, error } = useSWR(`${JAVA_API_URL}/reviews`);

  // pathにrestaurantが含まれている(店詳細ページにいる)場合はfalseにする
  // レビューページにいるときだけ店詳細ページへのリンクを付けたい
  useEffect(() => {
    const path = router.pathname;
    if (path.includes("restaurant")) {
      setHasRestaurantInfo(false);
    } else {
      setHasRestaurantInfo(true);
    }
  }, [router.pathname]);

  // ローディング処理
  if (!reviewList) {
    return <div>Loading...</div>;
  }

  // エラー処理
  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  return (
    <div className="w-full">
      {reviewList.map((review: LunchReview) => (
        <div key={review.reviewId}>
          <ReviewCard
            {...review}
            type="一覧"
            hasRestaurantInfo={hasRestaurantInfo}
          />
        </div>
      ))}
    </div>
  );
});
