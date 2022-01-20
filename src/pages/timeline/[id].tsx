import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
import { PostBtn } from "../../components/Button/PostBtn";
import { TrashBtn } from "../../components/Button/TrashBtn";
import { SubHeader } from "../../components/Layout/SubHeader";
import Image from "next/image";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { TimelineDetail } from "../../types/type";

/**
 * つぶやき詳細画面.
 * @returns つぶやき詳細画面
 */
const TweetDetail: NextPage = () => {
  //テストデータ
  const [data] = useState({
    postId: 1,
    userId: 1,
    name: "ふるもっちゃん",
    tweet:
      "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほ",
    img: "/image/userIcon/user3.jpeg",
    time: "00:00・0000/00/00",
    comment: [
      {
        postId: 2,
        userId: 2,
        name: "佐藤花子",
        tweet: "まじうける",
        img: "/image/userIcon/user1.jpeg",
      },
      {
        postId: 3,
        userId: 3,
        name: "次郎@駆け出しエンジニア",
        tweet: "分かります",
        img: "/image/userIcon/user6.jpeg",
      },
      {
        postId: 4,
        userId: 1,
        name: "ふるもっちゃん",
        tweet: "みんないいねしてね",
        img: "/image/userIcon/user3.jpeg",
      },
    ],
  });

  const style = {
    borderBottom: "solid 1px black",
  };

  //ルーターリンク
  const router = useRouter();
  /**
   * 戻るボタン押下で発動.
   */
  const backPage = () => {
    router.back();
  };

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  const loginUserId = Number(router.query.id);
  // const { data: timelineData, error } = useSWR<TimelineDetail>(
  //   `${JAVA_API_URL}/timeline/${loginUserId}`,
  // );

  // if (!error && !timelineData) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>データを取得できませんでした</div>;
  // }

  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="つぶやき詳細" />

      <div className="my-3 ml-3">
        <Button label="←戻る" size="sm" onClick={backPage} />
      </div>

      {/* つぶやき詳細 */}
      <div className="mx-5">
        <div>
          <div className="px-3 flex">
            <div className="w-3/12 cursor-pointer hover:opacity-50">
              <Image
                src={data.img}
                width={200}
                height={200}
                alt="icon"
                onClick={() => {
                  goUserPage(data.userId);
                }}
                className="rounded-full"
              />
            </div>
            <div className="w-9/12">
              <div className="text-xl font-extrabold py-3 ml-3">
                {data.name}
              </div>
              <div className="w-8/12 ml-3">{data.tweet}</div>
            </div>
          </div>

          <div className="text-right pb-5" style={style}>
            <div className="flex flex-col items-end gap-3 sm:flex-row justify-end mr-5 mt-5">
              <div className="mr-5">投稿日時：{data.time}</div>
              <div>
                <CommentIcon commentCount={300} />
                <FavoBtn postId={data.postId} />
                {loginUserId == data.userId && (
                  <TrashBtn postId={data.postId} />
                )}
              </div>
            </div>
          </div>
        </div>

        {data.comment.map((value, key) => (
          <div style={style} key={key} className="flex">
            <div className="w-1/5 text-center pt-5 cursor-pointer hover:opacity-50">
              <Image
                src={value.img}
                width={100}
                height={100}
                alt="icon"
                onClick={() => {
                  goUserPage(value.userId);
                }}
                className="rounded-full"
              />
            </div>
            <div className="w-4/5">
              <div className="text-xl font-extrabold py-3 ml-3">
                {value.name}
              </div>
              <div className="pt-5 pb-5 pl-5 w-8/12">{value.tweet}</div>
              <div className="w-full text-right py-3 pr-5">
                <FavoBtn postId={value.postId} />
                {loginUserId == value.userId && (
                  <TrashBtn postId={value.postId} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <PostBtn />
      </div>
    </>
  );
};

export default TweetDetail;
