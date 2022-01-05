import { NextPage } from "next";
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
      <div className="flex-col">
        <p className="text-3xl font-extrabold border-l-8 border-basic mb-5">
          {dummyData.name}
        </p>
        <div className="ml-24">
          ジャンル: {dummyData.genre}
          <span className="ml-8">タイプ: {dummyData.type}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
