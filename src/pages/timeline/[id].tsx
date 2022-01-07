import { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
//メニューバーコンポーネント
import { MenuBar } from "../../components/MenuBar";
//コメントアイコンコンポーネント
import { CommentIcon } from "../../components/CommentIcon";
//サブヘッダーコンポーネント
import { SubHeader } from "../../components/SubHeader";
//つぶやきをお気に入り登録するボタンコンポーネント
import { FavoBtn } from "../../components/FavoBtn";
//自分のつぶやきを消せるボタンコンポーネント(自分のつぶやきの時のみ表示させたい)
import { TweetTrashBtn } from "../../components/TweetTrashBtn";
import { Button } from "../../components/Button";
import Router from "next/router";

/**
 * つぶやき詳細画面.
 * @returns つぶやき詳細画面
 */
const TweetDetail: NextPage = () => {
  //テストデータ
  const [data] = useState({
    name: "山田太郎",
    tweet:
      "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほ",
    img: "/usakus.jpg",
    time: "00:00・0000/00/00",
    comment: [
      { name: "佐藤花子", tweet: "まじうける", img: "/usakus.jpg" },
      {
        name: "次郎@駆け出しエンジニア",
        tweet: "分かります",
        img: "/usakus.jpg",
      },
    ],
  });

  const style = {
    borderBottom: "solid 1px black",
  };

  /**
   * つぶやき投稿ページに飛ぶメソッド.
   */
  const goPostPage = () => {
    Router.push("/timeline/post");
  };

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
          <SubHeader title="つぶやき詳細" />
          {/* つぶやき詳細 */}
          <div>
            <div className="w-10/12 pt-3 pb-3 flex">
              <div className="w-3/12">
                <Image src={data.img} width={300} height={300} alt="icon" />
              </div>
              <div className="w-9/12">
                <div className="text-xl font-extrabold pt-3 pb-3">
                  {data.name}
                </div>
                <div className="pl-10">{data.tweet}</div>
              </div>
            </div>

            <div className="text-right pb-5" style={style}>
              <span className="mr-7">投稿日時：{data.time}</span>
              <CommentIcon commentCount={300} />
              <FavoBtn />
              <TweetTrashBtn />
            </div>
          </div>
          {/* コメント部分 */}
          {data.comment.map((value, key) => (
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

export default TweetDetail;
