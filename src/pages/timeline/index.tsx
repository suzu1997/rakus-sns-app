/* eslint-disable @next/next/link-passhref */
import type { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { MenuBar } from "../../components/MenuBar";
import { SubHeader } from "../../components/SubHeader";
import { Button } from "../../components/Button";
import { CommentIcon } from "../../components/CommentIcon";
import { FavoBtn } from "../../components/FavoBtn";
//自分のつぶやきを消せるボタンコンポーネント(自分のつぶやきの時のみ表示させたい)
import { TweetTrashBtn } from "../../components/TweetTrashBtn";

/**
 * タイムラインページ.
 * @returns つぶやきの一覧が流れてくるページ
 */
const Timeline: NextPage = () => {
  //テストデータ
  const [data] = useState([
    { name: "佐藤花子", tweet: "あああ", img: "/usakus.jpg" },
    { name: "山田太郎", tweet: "いいい", img: "/usakus.jpg" },
    { name: "ランチックス", tweet: "ううう", img: "/usakus.jpg" },
    { name: "佐藤花子", tweet: "あああ", img: "/usakus.jpg" },
    {
      name: "山田太郎",
      tweet:
        "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほ",
      img: "/usakus.jpg",
    },
    { name: "ランチックス", tweet: "ううう", img: "/usakus.jpg" },
  ]);

  //1人1人のつぶやきの下に入る線がどうしてもtailwindで上手くいかなかった
  const style = {
    borderBottom: "solid 1px black",
  };

  /**
   * つぶやき投稿ページに飛ぶメソッド.
   */
  const goPostPage = () => {
    Router.push("/timeline/post");
  };

  //HTMLコーナー
  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
          <div className="m-1 mt-10">
            <Button label="つぶやく" size="lg" onClick={goPostPage} />
          </div>
        </div>

        {/* サブヘッダー */}
        <div className="w-10/12">
          <SubHeader title="つぶやき" />

          {/* タイムラインゾーン */}
          {data.map((value, key) => (
            <div style={style} key={key} className="flex">
              <div className="w-1/5 text-center pt-5">
                <Image src={value.img} width={100} height={100} alt="icon" />
              </div>

              <div className="w-4/5">
                <div className="text-xl font-extrabold pt-3 pb-3">
                  {value.name}
                </div>
                <div className="pt-5 pb-5 pl-5 w-8/12">{value.tweet}</div>
                <div className="w-full text-right pt-3 pb-3">
                  <CommentIcon commentCount={300} />
                  <FavoBtn />
                  <TweetTrashBtn />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timeline;
