import { FC, memo } from "react";
import Image from "next/image";
import { CommentIcon } from "../Button/CommentIcon";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { getFormattedDate } from "../../utils/methods";
/**
 * タイムライン履歴を表示するカードコンポーネント
 */
export const TimelineHisCard: FC<Props> = memo((props) => {
  return (
    <div
      key={id}
      className=" border border-t-1 mt-1 border-blue-100text-sm font-medium leading-5 focus:outline-none rounded-xl bg-white relative p-3 "
    >
      <div
        className="hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
        onClick={() => {
          goDetailTimelinePage(id);
        }}
      >
        <span className="text-xl font-extrabold pt-3 pb-3">{accountName}</span>
        <span className="ml-7">
          つぶやき日時:
          {getFormattedDate(new Date(postedTime))}
        </span>
      </div>
      <div className="flex">
        <span
          className="rounded-full  pt-5 cursor-pointer hover:opacity-50"
          onClick={() => {
            goUserPage(userId);
          }}
        >
          <Image
            src={`/image/userIcon/${userPhotoPath}`}
            width={100}
            height={100}
            alt="icon"
            className="rounded-full"
          />
        </span>
        <span
          className="p-10 w-8/12 hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
          onClick={() => {
            goDetailTimelinePage(id);
          }}
        >
          {sentence}
        </span>
      </div>
      <div className="w-full text-right py-3">
        <CommentIcon
          commentCount={commentCount}
          postId={id}
          success={updateData}
          title="つぶやきにコメント"
        />
        <FavoBtn
          postId={id}
          favoCount={likeCount}
          isFavo={myLike}
          type="タイムライン"
          success={updateData}
        />
        {Number(loginId) === userId && (
          <TrashBtn postId={id} type="タイムライン" success={updateData} />
        )}
      </div>
    </div>
  );
});
