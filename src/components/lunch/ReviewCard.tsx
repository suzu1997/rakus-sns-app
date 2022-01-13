import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { CommentIcon } from "../Button/CommentIcon";
import { FavoBtn } from "../Button/FavoBtn";
import { Star } from "../Star";
import { TrashBtn } from "../Button/TrashBtn";
import { LinkToRestaurant } from "./LinkToRestaurat";

type Props = {
  id: number;
  name: string;
  content: string;
  img: string;
  time: string;
  star: number;
  type: string; // 一覧か詳細か
  hasRestaurantInfo: boolean; // 店詳細ページへのリンクを表示するかどうか
};

export const ReviewCard: FC<Props> = memo((props) => {
  const { id, name, content, img, time, star, type, hasRestaurantInfo } = props;
  const router = useRouter();

  /**
   * レビュー詳細ページへ遷移するメソッド.
   */
  const goReviewDetail = () => {
    router.push(`/lunch/review/${id}`);
  };

  return (
    <div
      className="flex w-full p-5 relative h-auto border border-t-0 border-gray-200 cursor-pointer"
      onClick={goReviewDetail}
    >
      <div className="mr-6">
        <Image src={img} width={100} height={100} alt="icon" />
      </div>
      <div className="flex flex-col w-full">
        <div className="text-xl font-extrabold pt-3 pb-3">{name}</div>
        <div>
          <Star starCount={star} />
        </div>
        <div className="pt-5 pb-5 pl-5">{content}</div>
        {/* hasRestaurantInfoがtrueならばレストラン情報へのリンクを表示する */}
        {hasRestaurantInfo && <LinkToRestaurant />}
        <div className="w-full text-right">
          {type === "詳細" && <span className="mr-7">投稿日時：{time}</span>}
          <CommentIcon commentCount={300} />
          <FavoBtn />
          <TrashBtn />
        </div>
      </div>
    </div>
  );
});
