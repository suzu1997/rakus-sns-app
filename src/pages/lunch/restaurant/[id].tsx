import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import useSWR from "swr";
import { Button } from "../../../components/Button/Button";
import { GoogleMap } from "../../../components/Lunch/GoogleMap";
import { ReviewList } from "../../../components/Lunch/ReviewList";
import { Star } from "../../../components/Lunch/Star";
import { PostModal } from "../../../components/Modal/PostModal";
import Image from "next/image";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { JAVA_API_URL } from "../../../utils/const";
import { Restaurant } from "../../../types/type";

/**
 * お店情報の詳細を表示するページ.
 *
 * @returns お店情報の詳細を表示する画面
 */
const RestaurantDetail: NextPage = () => {
  // レビュー投稿のモーダルのオープン状態
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // idをURLから取得
  const restaurantId = Number(router.query.id);

  const { data, error } = useSWR(`${JAVA_API_URL}/restaurant/${restaurantId}`);

  /**
   * モーダルを閉じるメソッド.
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  /**
   * モーダルを開けるメソッド.
   */
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  // レストラン情報をdataから抽出
  const restaurant: Restaurant = data.restaurant;

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
    <div className="flex">
      <div className="flex-1">
        <SubHeader title="ランチ店詳細" />
        <div className="flex flex-col lg:flex-row">
          <div className="flex-col mx-5 xl:mx-24 lg:w-2/3">
            <div
              className="cursor-pointer mb-4 mt-2"
              onClick={() => {
                router.back();
              }}
            >
              ←戻る
            </div>
            <p className="text-3xl font-extrabold border-l-8 border-basic mb-5">
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
                  src={`/${restaurant.photoPath}`}
                  width={300}
                  height={200}
                  alt="restaurant photo"
                />
              </div>
              <div className="mt-10">{restaurant.description}</div>
            </div>
            <p className="mt-10">住所: {restaurant.address}</p>
            <p className="mt-10">アクセス: {restaurant.access}</p>
            {/* 緯度と軽度から、googleマップを表示 */}
            <div className="w-5/6 mx-auto">
              <p className="mt-10">Map</p>
              <GoogleMap
                latitude={restaurant.latitude}
                longitude={restaurant.longitude}
              />
            </div>
            <p className="mt-10">
              ホットペッパーURL: <a href={restaurant.url}>{restaurant.url}</a>
            </p>
          </div>
          <div className="lg:w-1/3 mt-10 ml-auto">
            <div className="font-bold ml-3">
              この店へのレビュー
              <span className="ml-5">
                <Button label={"レビュー投稿"} size="sm" onClick={openModal} />
              </span>
            </div>
            <ReviewList />
          </div>
        </div>
        <PostModal
          isOpen={isOpen}
          closeModal={closeModal}
          title={"レビュー"}
          restaurantId={restaurant.id}
        />
      </div>
    </div>
  );
};

export default RestaurantDetail;
