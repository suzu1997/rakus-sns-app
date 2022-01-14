import Image from "next/image";
import { useCallback, useState } from "react";
import { NextPage } from "next";
import { SubHeader } from "../components/Layout/SubHeader";
import { useRouter } from "next/router";
import { Button } from "../components/Button/Button";

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
      id: 1,
      name: "佐藤花子",
      action: "お気に入り",
      img: "/usakus.jpg",
      postId: 500,
      post: "あああ",
    },
    {
      id: 1,
      name: "佐藤花子",
      action: "コメント",
      img: "/usakus.jpg",
      postId: 400,
      post: "いいい",
    },
    {
      id: 2,
      name: "三角次郎",
      action: "お気に入り",
      img: "/usakus.jpg",
      postId: 300,
      post: "あああ",
    },
    {
      id: 3,
      name: "山田太郎",
      action: "コメント",
      img: "/usakus.jpg",
      postId: 200,
      post: "うおお",
    },
    {
      id: 1,
      name: "佐藤花子",
      action: "お気に入り",
      img: "/usakus.jpg",
      postId: 100,
      post: "良い気持ち",
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
  const goUserPage = useCallback((userId: number) => {
    router.push(`/user/${userId}`);
  }, []);

  /**
   * 投稿クリックで投稿詳細ページに飛ぶ.
   * @param postId - 投稿ID
   */
  const goDetailPage = useCallback((postId: number) => {
    if (postId > 100) {
      router.push(`/timeline/${postId}`);
    } else {
      router.push(`/lunch/review/${postId}`);
    }
  }, []);

  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="通知" />

      <div className="text-center my-10">
        <Button
          label="新しい通知を読み込む"
          size="lg"
          onClick={() => {
            alert("新しい通知読み込み");
          }}
        />
      </div>

      {/* タイムラインゾーン */}
      {data.map((value, key) => (
        <div style={style} key={key}>
          <div
            className="p-5 ml-10"
            onClick={() => {
              goDetailPage(value.postId);
            }}
          >
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
              <span
                className="ml-3 cursor-pointer hover:opacity-50"
                onClick={() => {
                  goUserPage(value.id);
                }}
              >
                <Image src={value.img} width={100} height={100} alt="icon" />
              </span>
            </div>
            <div className=" cursor-pointer hover:opacity-50">
              <div className="text-xl pt-3 pb-3 ml-16">
                {value.name}さんがあなたの投稿に{value.action}しました
              </div>
              <div className="pt-5 pb-5 pl-5 w-8/12 ml-20 text-text-brown">
                {value.post}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div
        className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
        onClick={() => {
          alert("過去の通知読み込み");
        }}
      >
        過去の通知を見る…
      </div>
    </>
  );
};
export default Notion;
