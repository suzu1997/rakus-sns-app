import { NextPage } from "next";
import Image from "next/image";
import { Button } from "../../../components/Button";
import { ReviewList } from "../../../components/lunch/ReviewList";
import { MenuBar } from "../../../components/MenuBar";

/**
 * お店情報の詳細を表示するページ.
 */
const RestaurantDetail: NextPage = () => {
  // ダミーデータ
  const dummyData = {
    id: 1,
    name: "イタリアンが美味しい店",
    genre: "イタリアン",
    type: "店内",
    favarite: 100,
    img: "/cake.jpg",
  };

  return (
    <div className="flex">
      <MenuBar />
      <div className="flex-col mt-10 ml-24">
        <p className="text-3xl font-extrabold border-l-8 border-basic mb-5">
          {dummyData.name}
        </p>
        <div className="ml-24">
          ジャンル: {dummyData.genre}
          <span className="ml-8">タイプ: {dummyData.type}</span>
        </div>
        <div className="">⭐️⭐️⭐️⭐️⭐️</div>
        <Image
          src={dummyData.img}
          width={300}
          height={200}
          alt="restaurant photo"
        />
        {/* ここに地図を埋め込みたい */}
        <p className="mt-10">場所</p>
        <div>
          <Image src="/map-sample.png" width={600} height={400} alt="map" />
        </div>
      </div>
            <span className="ml-5">
              <Button
                label={"レビュー投稿"}
                size="sm"
                onClick={() => alert("レビュー投稿画面へ")}
              />
            </span>
      </div>
    </div>
  );
};

export default RestaurantDetail;
