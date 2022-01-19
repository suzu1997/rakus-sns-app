import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { Restaurant } from "../../types/type";
import { Star } from "./Star";

export const RestaurantCard: FC<Restaurant> = memo((props) => {
  const {
    restaurantId,
    restaurantName,
    restaurantGenre,
    restaurantStar,
    restaurantType,
    restaurantImg,
  } = props;
  const router = useRouter();

  /**
   * 個別の店情報ページへ遷移するメソッド.
   */
  const goRestaurantDetail = () => {
    router.push(`/lunch/restaurant/${restaurantId}`);
  };

  return (
    <div
      onClick={goRestaurantDetail}
      className="flex flex-col xl:flex-row justify-between w-full px-10 py-5 relative h-auto border border-t-0 border-gray-200 cursor-pointer"
    >
      <div className="relative">
        <p className="text-xl font-extrabold border-l-8 border-basic mb-5 lg:mb-10 hover:underline">
          {restaurantName}
        </p>
        <div className="xl:ml-10">ジャンル: {restaurantGenre}</div>
        <div className="xl:ml-10">タイプ: {restaurantType}</div>
        <div className="xl:ml-10">
          評価(平均): <Star starCount={restaurantStar} />
        </div>
      </div>
      <div className="mx-6 mt-3">
        <Image src={restaurantImg} width={300} height={200} alt="icon" />
      </div>
    </div>
  );
});
