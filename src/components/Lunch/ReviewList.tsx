import { useRouter } from "next/router";
import { FC, memo, useEffect, useState } from "react";
// import useSWR from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { LunchReview } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { ReviewCard } from "./ReviewCard";

type Props = {
  restaurantId?: number;
}

export const ReviewList: FC<Props> = memo((props) => {
  const { restaurantId } = props;

  // レビューカードがレストラン情報を持つかどうか
  const [hasRestaurantInfo, setHasRestaurantInfo] = useState<boolean>(true);
  const router = useRouter();

  // useSWRでクライアントフェッチ
  // const { data: reviewList, error } = useSWR<Array<LunchReview>>(
  //   `${JAVA_API_URL}/reviews`,
  // );

  /**
   * 各ページのSWRのキーを取得する関数.
   *
   * @remarks
   * useSWRInfiniteからデータをフェッチする際に呼び出される。
   * @param pageIndex - ページインデックス
   * @param previousPageData -
   * @returns ページのキー
   */
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    // 最後まで読み込んだらnullを返す
    if (previousPageData && !previousPageData.data) return null;

    // 一番最初のフェッチ
    if (pageIndex === 0) return `${JAVA_API_URL}/reviews`;

    // 一番古いレビューのIDを取得
    // これで一番古いレビューのIDが取れるのか？？やってみないとわからんです。
    const id = previousPageData.data[previousPageData.data.length - 1].reviewId;

    // 「過去のレビューを見る」ボタンを押したとき
    // 一番下の投稿IDをAPIに渡す
    return `${JAVA_API_URL}/reviews/old/${id}`;
  };

  // data: データの配列の配列(※ページごとの二重配列)
  // error: エラーの場合、エラー情報が入る
  // size:  ページサイズ(ページが何ページあるのか※最初は1ページ)
  // setSize:  ページサイズ変更する際に使用する(ページ数を増やすと自動的にフェッチ処理が走る)
  const { data, error, size, setSize } = useSWRInfinite(getKey);

  /**
   * レビューを追加読み込みする.
   *
   * @remarks
   * ページサイズを増やすことで、次のフェッチ処理を走らせる。
   */
  const loadMoreReviews = () => {
    setSize(size + 1);
  };

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
  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }
  // エラー処理
  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データを取得できませんでした
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* {reviewList?.map((review: LunchReview) => (
        <div key={review.reviewId}>
          <ReviewCard
            {...review}
            type="一覧"
            hasRestaurantInfo={hasRestaurantInfo}
          />
        </div>
      ))} */}
      {data?.map((reviewList: Array<LunchReview>) => {
        // dataはreviewList(配列)の配列
        return reviewList.map((review: LunchReview) => (
          <div key={review.reviewId}>
            <ReviewCard
              {...review}
              type="一覧"
              hasRestaurantInfo={hasRestaurantInfo}
            />
          </div>
        ));
      })}
      <div
        className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
        onClick={loadMoreReviews}
      >
        過去のレビューを見る…
      </div>
    </div>
  );
});
