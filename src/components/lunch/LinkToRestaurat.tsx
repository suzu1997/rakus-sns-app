import { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

/**
 * レビューから対象の店詳細ページへのリンクカード.
 */
export const LinkToRestaurant = () => {
  const router = useRouter();

  // ダミーのレストランデータ
  const restaurantInfo = {
    id: "J001041443",
    name: "らーめん 氣華ああああああああああああああ",
    img: "https://imgfp.hotp.jp/IMGH/76/15/P018367615/P018367615_238.jpg",
  };

  /**
   * 個別の店情報ページへ遷移するメソッド.
   *
   * @param event
   */
  const goRestaurantDetail = (e: MouseEvent<HTMLInputElement>) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    router.push(`/lunch/restaurant/${restaurantInfo.id}`);
  };

  return (
    <div
      className="flex gap-5 items-center border border-gray-300 rounded-md mb-3 md:mx-32"
      onClick={goRestaurantDetail}
    >
      <Image
        src={restaurantInfo.img}
        width={100}
        height={80}
        alt="restaurant photo"
      />
      <div className="font-bold text-md sm:text-lg">{restaurantInfo.name}</div>
    </div>
  );
};
