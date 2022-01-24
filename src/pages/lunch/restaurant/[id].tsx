import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { Button } from "../../../components/Button/Button";
import { ReviewList } from "../../../components/Lunch/ReviewList";
import { PostModal } from "../../../components/Modal/PostModal";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { RestaurantDetailContainer } from "../../../components/Lunch/RestaurantDetailContainer";
import useSWR from "swr";
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

  // idをURLから取得
  const restaurantId = Number(router.query.id);

  const { data, error } = useSWR(`${JAVA_API_URL}/restaurant/${restaurantId}`);

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

  return (
    <div className="flex">
      <div className="flex-1">
        <SubHeader title="ランチ店詳細" />
        <div
          className="cursor-pointer m-5"
          onClick={() => {
            router.back();
          }}
        >
          ←戻る
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* メインの店情報表示部分 */}
          <RestaurantDetailContainer restaurant={restaurant} />

          {/* レビューエリア */}
          <div className="lg:w-1/3 mt-10 sm:ml-auto">
            <div className="font-bold ml-3">
              この店へのレビュー
              <span className="ml-5">
                <Button label={"レビュー投稿"} size="sm" onClick={openModal} />
              </span>
            </div>
            <ReviewList restaurantId={restaurantId} />
            <PostModal
              isOpen={isOpen}
              closeModal={closeModal}
              title={"レビュー"}
              restaurantId={restaurantId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
