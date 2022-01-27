import { FC, memo, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { FavoBtn } from "../Button/FavoBtn";
import { CommentIcon } from "../Button/CommentIcon";
import { TrashBtn } from "../Button/TrashBtn";
import { Timeline } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { getFormattedDate } from "../../utils/methods";

type Props = {
  detailData: Timeline; //タイムライン詳細データ
  success?: () => void; //データの更新
};

/**
 * タイムライン詳細コンポーネント.
 */
export const TimelineDetailPage: FC<Props> = memo((props) => {
  const { detailData, success } = props;

  //ログインID
  const { loginId } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  return (
    <>
      <div>
        <div className="px-3 flex">
          <div className="w-3/12 cursor-pointer hover:opacity-50">
            <Image
              src={`/image/userIcon/${detailData.userPhotoPath}`}
              width={200}
              height={200}
              alt="icon"
              onClick={() => {
                goUserPage(detailData.userId);
              }}
              className="rounded-full"
            />
          </div>
          <div className="w-9/12">
            <div className="text-xl font-extrabold py-3 ml-3">
              {detailData.accountName}
            </div>
            <div className="w-8/12 ml-5">{detailData.sentence}</div>
          </div>
        </div>

        <div className="text-right pb-5">
          <div className="flex flex-col items-end gap-3 sm:flex-row justify-end mr-5 mt-5">
            <div className="mr-5">
              投稿日時： {getFormattedDate(new Date(detailData.postedTime))}
            </div>

            <div>
              <CommentIcon
                commentCount={detailData.commentCount}
                postId={detailData.id}
                target="timeline"
                success={success}
              />
              <FavoBtn
                postId={detailData.id}
                favoCount={detailData.likeCount}
                success={success}
                isFavo={detailData.myLike}
                type="タイムライン"
              />
              {Number(loginId) === detailData.userId && (
                <TrashBtn postId={detailData.id} type="タイムライン" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
