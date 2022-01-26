import { FC, memo } from "react";

import { RestaurantCard } from "./RestaurantCard";
import { Restaurant } from "../../types/type";
import { useSWRRestaurant } from "../../hooks/useSWRRestaurant";

/**
 * レストラン一覧用コンポーネント.
 */
export const RestaurantList: FC = memo(() => {
  const {
    data,
    isLast,
    error,
    loadMoreReviews,
  } = useSWRRestaurant();

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

  if (
    data !== undefined &&
    data[0].message === "レストランが1件も登録されていません"
  ) {
    return (
      <div className="w-full p-10 text-center">
        お店が1件も登録されていません🙇‍♀️
      </div>
    );
  }

  return (
    <div className="w-full">
      {data &&
        // dataはページごとの連想配列の配列
        data.map((pageData) =>
          pageData.restaurant.map((restaurant: Restaurant) => {
            return (
              <div key={restaurant.id}>
                <RestaurantCard {...restaurant} />
              </div>
            );
          }),
        )}
      {/* 最後まで読み込んでいればさらに読み込むボタンを表示しない */}
      {isLast === false ? (
        <div
          className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
          onClick={loadMoreReviews}
        >
          さらに読み込む
        </div>
      ) : (
        <div className="text-text-brown text-center my-5 ">
          最後まで読み込みました
        </div>
      )}
    </div>
  );
});
