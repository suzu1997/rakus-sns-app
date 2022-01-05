import Image from "next/image";
import { FC, memo } from "react";
import { CommentIcon } from "../CommentIcon";
import { TweetFavoBtn } from "../TweetFavoBtn";

type Props = {
  id: number;
  name: string;
  genre: string;
  type: string;
  favarite: number;
  img: string;
};

export const RestaurantCard: FC<Props> = memo((props) => {
  const { name, genre, type, img } = props;

  return (
    <div className="flex justify-between w-full px-10 py-5 relative h-auto border border-t-0 border-gray-200">
      <div className="relative">
        <p className="text-xl font-extrabold border-l-8 border-basic mb-10">{name}</p>
        <div className="ml-10">ジャンル: {genre}</div>
        <div className="ml-10">タイプ: {type}</div>
        <div className="ml-10">おすすめ度: ⭐️⭐️⭐️⭐️⭐️</div>
        <div className="absolute bottom-3 left-3">
          <CommentIcon commentCount={300} />
          <TweetFavoBtn />
        </div>
      </div>
      <div className="mx-6 mt-3">
        <Image src={img} width={300} height={200} alt="icon" />
      </div>
    </div>
  );
});
