import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { FavoBtn } from "../../../components/FavoBtn";
import { ReviewCard } from "../../../components/lunch/ReviewCard";
import { MenuBar } from "../../../components/MenuBar";
import { SubHeader } from "../../../components/SubHeader";
import { TrashBtn } from "../../../components/TrashBtn";

const ReviewDetail: NextPage = () => {
  //テストデータ
  const [reviewData] = useState({
    id: 1,
    name: "佐藤花子",
    content: "おいしかったです",
    img: "/usakus.jpg",
    star: 4,
    time: "00:00・0000/00/00",
    comment: [
      {
        name: "山田太郎",
        content: "俺もここ行った、うまかった",
        img: "/usakus.jpg",
      },
      {
        name: "ランチックス",
        content: "今度行ってみよー",
        img: "/usakus.jpg",
      },
    ],
  });

  return (
    <div className="flex">
      <MenuBar />
      <div className="flex-1 w-10/12">
        <SubHeader title={"レビュー詳細"} />
        <ReviewCard {...reviewData} type="詳細"/>
        {/* コメント部分 */}
        {reviewData.comment.map((value, key) => (
          <div key={key} className="flex border border-b border-gray-200">
            <div className="w-1/5 text-center pt-5">
              <Image src={value.img} width={100} height={100} alt="icon" />
            </div>

            <div className="w-4/5">
              <div className="text-xl font-extrabold pt-3 pb-3">
                {value.name}
              </div>
              <div className="pt-5 pb-5 pl-5 w-8/12">{value.content}</div>
              <div className="w-full text-right pt-3 pb-3">
                <FavoBtn />
                <TrashBtn />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDetail;
