import { FC, memo } from "react";
import Image from "next/image";

import { GoogleMap } from "./GoogleMap";
import { Star } from "./Star";
import { Restaurant } from "../../types/type";
import { getRestaurantPhotoPath } from "../../utils/methods";

type Props = {
  restaurant: Restaurant;
};

/**
 * 店詳細画面のメイン部分のコンポーネント.
 */
export const RestaurantDetailContainer: FC<Props> = memo((props) => {
  const { restaurant } = props;

  /**
   * タイプのidから文字列に変換する.
   * @returns 店内かお弁当か両方か
   */
  const typeValue = () => {
    if (restaurant.type === 1) {
      return "店内";
    } else if (restaurant.type === 2) {
      return "お弁当";
    } else if (restaurant.type === 3) {
      return "両方";
    }
  };

  return (
    <div className="flex-col m-5 xl:mx-24 lg:w-2/3">
      <p className="text-lg lg:text-3xl font-extrabold border-l-8 border-basic mb-5">
        {restaurant.name}
      </p>
      <div className="flex flex-col sm:flex-row items-baseline">
        <span className="mr-8 mb-5 sm:mb-0">
          <Star starCount={restaurant.star} />
        </span>
        ジャンル: {restaurant.genreValue}
        <span className="sm:ml-8">タイプ: {typeValue()}</span>
      </div>
      <div className="mt-5 sm:mt-10">
        <div>
          <Image
            src={getRestaurantPhotoPath(restaurant.photoPath)}
            width={300}
            height={200}
            alt="restaurant photo"
          />
        </div>
        {restaurant.description && (
          <div className="mt-10">{restaurant.description}</div>
        )}
        {restaurant.smoking && (
          <div className="mt-10">禁煙席: {restaurant.smoking}</div>
        )}
      </div>
      <p className="mt-10">住所: {restaurant.address}</p>
      {restaurant.access && (
        <p className="mt-10">アクセス: {restaurant.access}</p>
      )}
      {/* 緯度と軽度から、googleマップを表示 */}
      {restaurant.latitude && (
        <div className="w-5/6 mx-auto">
          <p className="mt-10">Map</p>
          <GoogleMap
            latitude={restaurant.latitude}
            longitude={restaurant.longitude}
          />
        </div>
      )}
      {restaurant.url && (
        <p className="my-10 break-all">
          参考URL:
          <a href={restaurant.url}>{restaurant.url}</a>
        </p>
      )}
    </div>
  );
});
