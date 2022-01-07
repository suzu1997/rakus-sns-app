/* eslint-disable @next/next/link-passhref */
import type { NextPage } from "next";
import Image from "next/image";
import { useCallback, useState } from "react";
import { MenuBar } from "../../components/MenuBar";
import { SubHeader } from "../../components/SubHeader";
import { Button } from "../../components/Button";
import { CommentIcon } from "../../components/CommentIcon";
import { FavoBtn } from "../../components/FavoBtn";
//自分のつぶやきを消せるボタンコンポーネント(自分のつぶやきの時のみ表示させたい)
import { TrashBtn } from "../../components/TrashBtn";
import { PostModal } from "../../components/PostModal";

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

  // レビュー投稿のモーダルのオープン状態
  const [isOpen, setIsOpen] = useState(false);

  /**
   * モーダルを開けるメソッド.
   */
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * モーダルを閉じるメソッド.
   */
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  //過去の投稿を読み込むがテキストで指しても指にならないので、ポインターを指にした
  const pointStyle = {
    cursor: "pointer",
  };

  //HTMLコーナー
  return (
    <>
      {/* 投稿モーダル */}
      <PostModal isOpen={isOpen} closeModal={closeModal} title={"つぶやき"} />

      <div className="flex">
        <div>
          <MenuBar />
          <div className="m-1 mt-10">
            <Button label="つぶやく" size="lg" onClick={openModal} />
          </div>
        </div>

        {/* サブヘッダー */}
        <div className="w-10/12">
          <SubHeader title="つぶやき" />

          {/* タイムラインゾーン */}

          <div className="text-center my-10 animate-bounce">
            <Button
              label="新しいつぶやきを読み込む"
              size="lg"
              onClick={() => {
                alert("新しいつぶやき読み込み");
              }}
            />
          </div>

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
                  <TrashBtn />
                </div>
              </div>
            </div>
          ))}
          <div
            className="text-text-brown text-center my-5"
            style={pointStyle}
            onClick={() => {
              alert("過去のつぶやき読み込み");
            }}
          >
            過去の投稿を見る…
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
