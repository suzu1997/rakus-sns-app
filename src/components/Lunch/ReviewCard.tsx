import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo, MouseEvent } from "react";
import { CommentIcon } from "../Button/CommentIcon";
import { FavoBtn } from "../Button/FavoBtn";
import { Star } from "./Star";
import { TrashBtn } from "../Button/TrashBtn";
import { LinkToRestaurant } from "./LinkToRestaurat";
import { LunchReview } from "../../types/type";

type Props = LunchReview & {
  type: string;
  hasRestaurantInfo: boolean;
};

export const ReviewCard: FC<Props> = memo((props) => {
  const {
    id,
    userId,
    accountName,
    userPhotoPath,
    restaurantId,
    restaurantName,
    restaurantPhotoPath,
    star,
    sentence,
    likeCount,
    commentCount,
    postedTime,
    myLike,
    type,
    hasRestaurantInfo,
  } = props;

  const router = useRouter();

  /**
   * レストラン画像のパスを取得するメソッド.
   * @remarks
   * restaurantPhotoPathに"hotp"が含まれていれば、ホットペッパー画像のパスをそのまま返す。含まれていなければ、publicフォルダ内の画像までのパスを返す。
   * @returns 表示するレストラン画像のパス
   */
  const getRestaurantPhotoPath = () => {
    if (restaurantPhotoPath.includes("hotp")) {
      return restaurantPhotoPath;
    } else {
      return `/image/foodPhoto/${restaurantPhotoPath}`;
    }
  };

  /**
   * レビュー詳細ページへ遷移するメソッド.
   */
  const goReviewDetail = () => {
    router.push(`/lunch/review/${id}`);
  };

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   */
  const goUserPage = (e: MouseEvent<HTMLInputElement>) => {
    // 親要素へのイベントの伝搬を止める
    e.stopPropagation();
    router.push(`/user/${userId}`);
  };

  return (
    <div
      className="flex flex-col w-full p-3 relative h-auto border border-t-0 border-gray-200 cursor-pointer"
      onClick={goReviewDetail}
    >
      <div className="flex">
        <div className="mr-6" onClick={goUserPage}>
          <Image
            src={`/image/userIcon/${userPhotoPath}`}
            width={100}
            height={100}
            alt="icon"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="text-xl font-extrabold pt-3 pb-3">{accountName}</div>
          <div>
            <Star starCount={star} />
          </div>
          <div className="pt-5 pb-5 pr-1">{sentence}</div>
        </div>
      </div>
      <div>
        {/* hasRestaurantInfoがtrueならばレストラン情報へのリンクを表示する */}
        {hasRestaurantInfo && (
          <LinkToRestaurant
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            restaurantImg={getRestaurantPhotoPath()}
          />
        )}
        <div className="flex flex-col items-end gap-3 sm:flex-row justify-end">
          {type === "詳細" && (
            <span className="mr-7">投稿日時：{postedTime}</span>
          )}
          <div>
            <CommentIcon
              commentCount={commentCount}
              postId={id}
              target="reviews"
            />
            <FavoBtn postId={id} favoCount={likeCount} isFavo={myLike} />
            <TrashBtn postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
});
