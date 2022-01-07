import { NextPage } from "next";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "../../../components/Button";
import { ReviewList } from "../../../components/lunch/ReviewList";
import { PostModal } from "../../../components/PostModal";
import { MenuBar } from "../../../components/MenuBar";

/**
 * お店情報の詳細を表示するページ.
 *
 * @returns お店情報の詳細を表示する画面
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
    id: "J001041443",
    name: "らーめん 氣華",
    genre: "ラーメン",
    type: "店内",
    favorite: 100,
    img: "https://imgfp.hotp.jp/IMGH/76/15/P018367615/P018367615_238.jpg",
    address: "東京都新宿区新宿２－７－５松田ビル１F",
    access:
      "新宿三丁目駅から新宿通りを新宿御苑前駅方面に進んでいただいて、徒歩4分大通りに面しております。",
    lat: "35.6896771976", // 緯度
    lng: "139.7079539006", // 経度
    url: "https://www.hotpepper.jp/strJ001041443/?vos=nhppalsa000016",
    catch: "野菜を使ったメニュー サイドメニューもご用意",
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
            <div className="mt-10">{dummyData.catch}</div>
          </div>
          <p className="mt-10">住所: {dummyData.address}</p>
          <p className="mt-10">アクセス: {dummyData.access}</p>
          {/* ここに地図を埋め込みたい */}
          <p className="mt-10">場所(マップを埋め込みたい。)</p>
          <div>
            <Image src="/map-sample.png" width={600} height={400} alt="map" />
          </div>
          <p>
            ホットペッパーURL:{" "}
            <a href="https://www.hotpepper.jp/strJ001041443/?vos=nhppalsa000016">
              https://www.hotpepper.jp/strJ001041443/?vos=nhppalsa000016
            </a>
          </p>
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
      <PostModal isOpen={isOpen} closeModal={closeModal} title={"レビュー"} />
    </div>
  );
};

export default RestaurantDetail;