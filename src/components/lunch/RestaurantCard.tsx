import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { Star } from "./Star";

type Props = {
  id: number;
  name: string;
  genre: string;
  type: string;
  star: number;
  img: string;
};

export const RestaurantCard: FC<Props> = memo((props) => {
  const { id, name, genre, type, star, img } = props;
  const router = useRouter();

  /**
   * 個別の店情報ページへ遷移するメソッド.
   */
  const goRestaurantDetail = () => {
    router.push(`/lunch/restaurant/${id}`);
  };

  return (
    <div
      onClick={goRestaurantDetail}
      className="flex flex-col sm:flex-row justify-between w-full px-10 py-5 relative h-auto border border-t-0 border-gray-200 cursor-pointer"
    >
      <div className="relative">
        <p className="text-xl font-extrabold border-l-8 border-basic mb-5 sm:mb-10 hover:underline">
          {name}
        </p>
        <div className="sm:ml-10">ジャンル: {genre}</div>
        <div className="sm:ml-10">タイプ: {type}</div>
        <div className="sm:ml-10">
          評価(平均): <Star starCount={star} />
        </div>
      </div>
      <div className="mx-6 mt-3">
        <Image src={img} width={300} height={200} alt="icon" />
      </div>
    </div>
  );
});
