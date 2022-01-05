import { NextPage } from "next";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "../../../components/Button";
import { ReviewList } from "../../../components/lunch/ReviewList";
import { ReviewPostModal } from "../../../components/lunch/ReviewPostModal";
import { MenuBar } from "../../../components/MenuBar";

/**
 * お店情報の詳細を表示するページ.
 */
const RestaurantDetail: NextPage = () => {
  // レビュー投稿のモーダルのオープン状態
  const [isOpen, setIsOpen] = useState(false);

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

  // ダミーデータ
  const dummyData = {
    id: 1,
    name: "イタリアンが美味しい店",
    genre: "イタリアン",
    type: "店内",
    favorite: 100,
    img: "/cake.jpg",
    address: "東京都新宿区新宿◯-◯-◯",
  };

  return (
    <div className="flex">
      <MenuBar />
      <div className="flex- flex w-10/12">
        <div className="flex-col mt-10 mx-24 w-2/3">
          <p className="text-3xl font-extrabold border-l-8 border-basic mb-5">
            {dummyData.name}
          </p>
          <div className="">
            <span className="mr-8">⭐️⭐️⭐️⭐️⭐️</span>
            ジャンル: {dummyData.genre}
            <span className="ml-8">タイプ: {dummyData.type}</span>
          </div>
          <div className="mt-10">
            <div>
              <Image
                src={dummyData.img}
                width={300}
                height={200}
                alt="restaurant photo"
              />
            </div>
            <div className="mt-10">
              店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？店の説明？
            </div>
          </div>
          <p className="mt-10">住所: {dummyData.address}</p>
          {/* ここに地図を埋め込みたい */}
          <p className="mt-10">場所(マップを埋め込みたい。)</p>
          <div>
            <Image src="/map-sample.png" width={600} height={400} alt="map" />
          </div>
        </div>
        <div className="w-1/3 mt-10 ml-auto">
          <div className="font-bold">
            この店へのレビュー
            <span className="ml-5">
              <Button label={"レビュー投稿"} size="sm" onClick={openModal} />
            </span>
          </div>
          <ReviewList />
        </div>
      </div>
      <ReviewPostModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default RestaurantDetail;
