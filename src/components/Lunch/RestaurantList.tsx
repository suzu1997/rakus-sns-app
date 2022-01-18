import { FC, memo } from "react";
import useSWR from "swr";
import { Restaurant } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantList: FC = memo(() => {
  const { data: restaurantList, error } = useSWR<Array<Restaurant>>(
    `${JAVA_API_URL}/restaurants`,
  );
  
  if (!error && !restaurantList) {
    return <div className="w-full">Loading...</div>;
  }
  
  if (error) {
    return <div className="w-full">データが取得できませんでした</div>;
  }

  return (
    <div className="w-full">
      {restaurantList?.map((restaurant) => (
        <div key={restaurant.restaurantId}>
          <RestaurantCard {...restaurant} />
        </div>
      ))}
    </div>
  );
});
