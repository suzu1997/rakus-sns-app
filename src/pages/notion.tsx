import Image from "next/image";
import { useState, useCallback } from "react";
import { NextPage } from "next";
import { SubHeader } from "../components/SubHeader";
import { MenuBar } from "../components/MenuBar";

/**
 * 通知ページ.
 * @remarks ログインしているユーザのIDをAPIで送って、該当の情報を取得
 * @returns 通知が見れるページ
 */
const Notion: NextPage = () => {
  //テストデータ
  //反応した人の名前／アイコン／いいねかコメントか／対象の投稿(レビューに対してか／つぶやきに対してかも表示？)
  const [data] = useState([
    {
      name: "佐藤花子",
      action: "お気に入り",
      img: "/usakus.jpg",
      tweet: "あああ",
    },
    {
      name: "佐藤花子",
      action: "コメント",
      img: "/usakus.jpg",
      tweet: "いいい",
    },
    {
      name: "三角次郎",
      action: "お気に入り",
      img: "/usakus.jpg",
      tweet: "あああ",
    },
    {
      name: "山田太郎",
      action: "コメント",
      img: "/usakus.jpg",
      tweet: "うおお",
    },
    {
      name: "佐藤花子",
      action: "お気に入り",
      img: "/usakus.jpg",
      tweet: "良い気持ち",
    },
  ]);

  //1人1人のつぶやきの下に入る線がどうしてもtailwindで上手くいかなかった
  const style = {
    borderBottom: "solid 1px black",
  };

  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>

        {/* サブヘッダー */}
        <div className="w-10/12">
          <SubHeader title="通知" />

          {/* タイムラインゾーン */}
          {data.map((value, key) => (
            <div style={style} key={key}>
              <div className="p-5 ml-10">
                <div className="flex">
                  {value.action === "お気に入り" && (
                    <span className="text-2xl text-red-500 mt-10">
                      <i className="fas fa-heart"></i>
                    </span>
                  )}
                  {value.action === "コメント" && (
                    <span className="text-3xl text-yellow-600 mt-10">
                      <i className="fas fa-comment"></i>
                    </span>
                  )}
                  <span className="ml-3">
                    <Image
                      src={value.img}
                      width={100}
                      height={100}
                      alt="icon"
                    />
                  </span>
                </div>

                <div className="text-xl pt-3 pb-3 ml-16">
                  {value.name}さんがあなたの投稿に{value.action}しました
                </div>
                <div className="pt-5 pb-5 pl-5 w-8/12 ml-20 text-text-brown">
                  {value.tweet}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Notion;
