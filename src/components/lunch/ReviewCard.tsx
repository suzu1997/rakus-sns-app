import Image from "next/image";
import { FC, memo } from "react";
import { CommentIcon } from "../CommentIcon";
import { FavoBtn } from "../FavoBtn";
import { TweetTrashBtn } from "../TweetTrashBtn";

type Props = {
  id: number;
  name: string;
  content: string;
  img: string;
};

export const ReviewCard: FC<Props> = memo((props) => {
  const { name, content, img } = props;

  return (
    <div className="flex w-full p-5 relative h-auto border border-t-0 border-gray-200">
      <div className="mr-6">
        <Image src={img} width={100} height={100} alt="icon" />
      </div>
      <div className="flex flex-col w-full">
        <div className="text-xl font-extrabold pt-3 pb-3">{name}</div>
        <div className="pt-5 pb-5 pl-5">{content}</div>
        <div className="w-full text-right">
          <CommentIcon commentCount={300} />
          <FavoBtn />
          <TweetTrashBtn />
        </div>
      </div>
    </div>
  );
});
