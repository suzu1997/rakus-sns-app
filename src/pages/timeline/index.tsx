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
import { useRouter } from "next/router";
import { PostBtn } from "../../components/PostBtn";

/**
 * タイムラインページ.
 * @returns つぶやきの一覧が流れてくるページ
 */
const Timeline: NextPage = () => {
  //テストデータ
  const [data] = useState([
    {
      id: 1,
      name: "佐藤花子",
      postId: 100,
      tweet: "あああ",
      img: "/usakus.jpg",
    },
    {
      id: 2,
      name: "山田太郎",
      postId: 200,
      tweet: "いいい",
      img: "/usakus.jpg",
    },
    {
      id: 3,
      name: "ランチックス",
      postId: 300,
      tweet: "ううう",
      img: "/usakus.jpg",
    },
    {
      id: 1,
      name: "佐藤花子",
      postId: 400,
      tweet: "あああ",
      img: "/usakus.jpg",
    },
    {
      id: 2,
      name: "山田太郎",
      postId: 500,
      tweet:
        "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほ",
      img: "/usakus.jpg",
    },
    {
      id: 3,
      name: "ランチックス",
      postId: 600,
      tweet: "ううう",
      img: "/usakus.jpg",
    },
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

  //ルーターリンク
  const router = useRouter();
  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  /**
   * 投稿クリックで投稿詳細ページに飛ぶ.
   * @param postId - 投稿ID
   */
  const goDetailPage = (postId: number) => {
    router.push(`/timeline/${postId}`);
  };

  //HTMLコーナー
  return (
    <>
      {/* 投稿モーダル */}
      <PostModal isOpen={isOpen} closeModal={closeModal} title={"つぶやき"} />
      <div className="flex">
        <MenuBar />
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
              <div
                className="rounded-full w-1/5 text-center pt-5 cursor-pointer hover:opacity-50"
                onClick={() => {
                  goUserPage(value.id);
                }}
              >
                <Image src={value.img} width={100} height={100} alt="icon" />
              </div>
              <div className="w-4/5">
                <div
                  className="cursor-pointer hover:opacity-50"
                  onClick={() => {
                    goDetailPage(value.postId);
                  }}
                >
                  <div className="text-xl font-extrabold pt-3 pb-3">
                    {value.name}
                  </div>
                  <div className="pt-5 pb-5 pl-5 w-8/12">{value.tweet}</div>
                </div>

                <div className="w-full text-right py-3 pr-14">
                  <CommentIcon commentCount={300} />
                  <FavoBtn />
                  <TrashBtn />
                </div>
              </div>
            </div>
          ))}
          <div
            className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
            onClick={() => {
              alert("過去のつぶやき読み込み");
            }}
          >
            過去の投稿を見る…
          </div>
        </div>
        <div>
          <PostBtn onClick={openModal} />
        </div>
      </div>
    </>
  );
};

export default Timeline;
