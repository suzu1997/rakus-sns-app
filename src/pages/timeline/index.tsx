/* eslint-disable @next/next/link-passhref */
import Image from "next/image";
import type { NextPage } from "next";
import { useState } from "react";
import { MenuBar } from "../../components/MenuBar";
import { SubHeader } from "../../components/SubHeader";
import { Button } from "../../components/Button";
import { CommentIcon } from "../../components/CommentIcon";
import { FavoBtn } from "../../components/FavoBtn";
//自分のつぶやきを消せるボタンコンポーネント(自分のつぶやきの時のみ表示させたい)
import { TrashBtn } from "../../components/TrashBtn";
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
      postId: 1,
      name: "佐藤花子",
      userId: 100,
      post: "あああ",
      img: "/usakus.jpg",
    },
    {
      postId: 2,
      name: "山田太郎",
      userId: 200,
      post: "いいい",
      img: "/usakus.jpg",
    },
    {
      postId: 3,
      name: "ランチックス",
      userId: 300,
      post: "ううう",
      img: "/usakus.jpg",
    },
    {
      postId: 1,
      name: "佐藤花子",
      userId: 400,
      post: "あああ",
      img: "/usakus.jpg",
    },
    {
      postId: 2,
      name: "山田太郎",
      userId: 500,
      post: "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほ",
      img: "/usakus.jpg",
    },
    {
      postId: 3,
      name: "ランチックス",
      userId: 600,
      post: "ううう",
      img: "/usakus.jpg",
    },
  ]);

  //1人1人のつぶやきの下に入る線
  const style = {
    borderBottom: "solid 1px black",
  };

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
                  goUserPage(value.userId);
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
                  <div className="pt-5 pb-5 pl-5 w-8/12">{value.post}</div>
                </div>

                <div className="w-full text-right py-3 pr-14">
                  <CommentIcon commentCount={300} postId={value.postId} />
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
          <PostBtn />
        </div>
      </div>
    </>
  );
};

export default Timeline;
