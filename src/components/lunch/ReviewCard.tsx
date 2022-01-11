import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo } from "react";
import { CommentIcon } from "../CommentIcon";
import { FavoBtn } from "../FavoBtn";
import { TrashBtn } from "../TrashBtn";

type Props = {
  id: number;
  name: string;
  content: string;
  img: string;
  time: string;
  star: number;
  type: string; // 一覧か詳細か
};

export const ReviewCard: FC<Props> = memo((props) => {
  const { id, name, content, img, time, star, type } = props;
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
        <div>⭐️⭐️⭐️⭐️⭐️({star})</div>
        <div className="pt-5 pb-5 pl-5">{content}</div>
        <div className="w-full text-right">
          {type === "詳細" && <span className="mr-7">投稿日時：{time}</span>}
          <CommentIcon commentCount={300} postId={id} />
          <FavoBtn />
          <TrashBtn />
        </div>
      </div>
    </div>
  );
});
