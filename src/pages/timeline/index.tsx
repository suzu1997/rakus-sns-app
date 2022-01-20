import Image from "next/image";
import type { NextPage } from "next";
import { useContext, useState } from "react";
import { SubHeader } from "../../components/Layout/SubHeader";
import { Button } from "../../components/Button/Button";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
//自分のつぶやきを消せるボタンコンポーネント(自分のつぶやきの時のみ表示させたい)
import { TrashBtn } from "../../components/Button/TrashBtn";
import { useRouter } from "next/router";
import { PostBtn } from "../../components/Button/PostBtn";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";

/**
 * タイムラインページ.
 * @returns つぶやきの一覧が流れてくるページ
 */
const Timeline: NextPage = () => {
  //テストデータ
  const [data] = useState([
    {
      postId: 1,
      name: "ふるもっちゃん",
      userId: 1,
      post: "あああ",
      img: "/image/userIcon/user3.jpeg",
    },
    {
      postId: 2,
      name: "山田太郎",
      userId: 200,
      post: "いいい",
      img: "/image/userIcon/user2.jpeg",
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
      name: "ふるもっちゃん",
      userId: 1,
      post: "あああ",
      img: "/image/userIcon/user3.jpeg",
    },
    {
      postId: 2,
      name: "佐藤花子",
      userId: 500,
      post: "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほ",
      img: "/image/userIcon/user1.jpeg",
    },
    {
      postId: 3,
      name: "ランチックス",
      userId: 600,
      post: "ううう",
      img: "/usakus.jpg",
    },
  ]);

  //ログインID
  const loginId = useContext(loginIdContext);

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

  // const { data: timelineData, error } = useSWR<Timeline>(
  //   `${JAVA_API_URL}/timeline`,
  // );

  // if (!error && !timelineData) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>データを取得できませんでした</div>;
  // }

  //HTMLコーナー
  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="タイムライン" />

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
            <Image
              src={value.img}
              width={100}
              height={100}
              alt="icon"
              className="rounded-full"
            />
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

            <div className="w-full text-right py-3">
              <CommentIcon commentCount={300} />
              <FavoBtn postId={value.postId} />
              {loginId == value.userId && <TrashBtn postId={value.postId} />}
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
      <div>
        <PostBtn />
      </div>
    </>
  );
};

export default Timeline;
