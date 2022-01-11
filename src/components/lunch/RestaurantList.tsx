import { FC, memo, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";

export const RestaurantList: FC = memo(() => {
  //テストデータ
  const [restaurantData] = useState([
    {
      id: 1,
      name: "イタリアンが美味しい店",
      genre: "イタリアン",
      type: "店内",
      star: 4.5, 
      img: "/cake.jpg",
    },
    {
      id: 2,
      name: "行列のできるラーメン屋",
      genre: "ラーメン",
      type: "店内",
      star: 3.8, 
      img: "/cake.jpg",
    },
    {
      id: 3,
      name: "生クリームうどん",
      genre: "うどん",
      type: "店内",
      star: 4, 
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
});
