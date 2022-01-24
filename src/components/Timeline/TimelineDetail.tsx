import { FC, memo, useContext } from "react";
import { CommentIcon } from "../Button/CommentIcon";
import Image from "next/image";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { TimelineDetail } from "../../types/type";
import { useRouter } from "next/router";
import { loginIdContext } from "../../providers/LoginIdProvider";

type Props = {
  detailData: TimelineDetail; //タイムライン詳細データ
  getData?: () => void; //データの更新
};

/**
 * タイムライン詳細コンポーネント.
 */
export const TimelineDetailPage: FC<Props> = memo((props) => {
  const { detailData, getData } = props;

  //ログインID
  const loginId = useContext(loginIdContext);

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

        <div className="text-right pb-5  border border-t-0 border-gray-200">
          <div className="flex flex-col items-end gap-3 sm:flex-row justify-end mr-5 mt-5">
            <div className="mr-5">投稿日時：{detailData.postedTime}</div>
            <div>
              <CommentIcon
                commentCount={detailData.commentCount}
                postId={detailData.id}
                target="timeline"
              />
              <FavoBtn
                postId={detailData.id}
                favoCount={detailData.likeCount}
                getData={getData}
                isFavo={detailData.myLike}
              />
              {loginId == detailData.userId && (
                <TrashBtn postId={detailData.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
