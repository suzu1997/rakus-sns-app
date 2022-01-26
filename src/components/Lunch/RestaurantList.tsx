import { FC, memo } from "react";
import useSWR from "swr";

import { RestaurantCard } from "./RestaurantCard";
import { Restaurant } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";

/**
 * レストラン一覧用コンポーネント.
 */
export const RestaurantList: FC = memo(() => {
  const { data, error } = useSWR(`${JAVA_API_URL}/restaurant`);

  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データが取得できませんでした
      </div>
    );
  }

  if (data.message === "レストランが1件も登録されていません") {
    return (
      <div className="w-full p-10 text-center">
        お店が1件も登録されていません🙇‍♀️
      </div>
    );
  }

  // レストラン一覧をdataから抽出
  const restaurantList: Array<Restaurant> = data.restaurant;

  return (
    <div className="w-full">
      {restaurantList.map((restaurant: Restaurant) => (
        <div key={restaurant.id}>
          <RestaurantCard {...restaurant} />
        </div>
      ))}
    </div>
  );
});
