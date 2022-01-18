import { FC, memo } from "react";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantList: FC = memo(() => {
  const { data: restaurantList, error } = useSWR(`${JAVA_API_URL}/restaurants`);

  if (!error && !restaurantList) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データが取得できませんでした</div>;
  }

  return (
    <div className="w-full">
      {restaurantList.map((restaurant) => (
        <div key={restaurant.id}>
          <RestaurantCard {...restaurant} />
        </div>
      ))}
    </div>
  );
});
