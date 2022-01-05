import { FC, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantList: FC = () => {
  //テストデータ
  const [restaurantData] = useState([
    {
      id: 1,
      name: "イタリアンが美味しい店",
      genre: "イタリアン",
      type: "店内",
      favarite: 100,
      img: "/cake.jpg",
    },
    {
      id: 2,
      name: "行列のできるラーメン屋",
      genre: "ラーメン",
      type: "店内",
      favarite: 200,
      img: "/cake.jpg",
    },
    {
      id: 3,
      name: "生クリームうどん",
      genre: "うどん",
      type: "店内",
      favarite: 300,
      img: "/cake.jpg",
    },
  ]);

  return (
    <div className="w-full">
      {restaurantData.map((restaurant) => (
        <div key={restaurant.id}>
          <RestaurantCard {...restaurant} />
        </div>
      ))}
    </div>
  );
};
