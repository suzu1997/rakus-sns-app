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

  //ルーターリンク
  const router = useRouter();
  /**
   * 戻るボタン押下で発動.
   */
  const backPage = () => {
    router.back();
  };

  return (
    <>
      {/* サブヘッダー */}
      <div className="sm:w-10/12 w-full">
        <SubHeader title="つぶやき詳細" />

        <div className="my-3 ml-3">
          <Button label="←戻る" size="sm" onClick={backPage} />
        </div>

        {/* つぶやき詳細 */}
        <div>
          <div className="pt-3 pb-3 flex">
            <div className="w-3/12">
              <Image src={data.img} width={300} height={300} alt="icon" />
            </div>
            <div className="w-9/12">
              <div className="text-xl font-extrabold py-3">{data.name}</div>
              <div className="w-8/12 ml-3">{data.tweet}</div>
            </div>
          </div>

          <div className="text-right pb-5" style={style}>
            <div className="mr-7 my-3">投稿日時：{data.time}</div>
            <CommentIcon commentCount={300} />

            <FavoBtn />
            <TrashBtn />
          </div>
        </div>
      </div>

      <div>
        <PostBtn />
      </div>
    </>
  );
};

export default TweetDetail;
