import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { TimelineComment } from "../../types/type";
import { useRouter } from "next/router";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";
import axios from "axios";

type Props = {
  postId: number; //コメントリスト
  success: () => void; //データの更新
};

/**
 * タイムライン詳細ページのコメントコンポーネント.
 */
export const CommentList: FC<Props> = memo((props) => {
  const { postId, success } = props;

  //ログインID
  const loginId = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  /**
   * ごみ箱ボタン表示非表示判断のため、ログインIDをハッシュ値→通常のIDに変換.
   */
  const { data: userInfo } = useSWR(`${JAVA_API_URL}/user/${loginId}`);
  const [trashCheckId] = useState(userInfo?.user.id);

  /**
   * コメントリスト取得.
   */
  const { data: timelineDetail } = useSWR(
    `${JAVA_API_URL}/timeline/detail/${postId}/${loginId}`,
  );
  const [commentList] = useState<TimelineComment>(timelineDetail.commentList);

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  //初期値エラー
  if (!commentList) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="border border-t-0 border-gray-200">
      {commentList ? (
        <div>
          {commentList.map((value, key) => (
            <div key={key} className="flex">
              <div className="w-1/5 text-center pt-5 cursor-pointer hover:opacity-50">
                <Image
                  src={`/image/userIcon/${value.userPhotoPath}`}
                  width={100}
                  height={100}
                  alt="icon"
                  onClick={() => {
                    goUserPage(value.userId);
                  }}
                  className="rounded-full"
                />
              </div>
              <div className="w-4/5">
                <div className="text-xl font-extrabold py-3 ml-3">
                  {value.accountName}
                </div>
                <div className="pt-5 pb-5 pl-5 w-8/12">{value.comment}</div>
                <div className="w-full text-right py-3 pr-5">
                  <FavoBtn
                    postId={value.id}
                    favoCount={value.commentLikeCount}
                    success={success}
                    isFavo={value.myLike}
                    type="タイムラインコメント"
                  />
                  {trashCheckId === value.userId && (
                    <TrashBtn
                      postId={value.id}
                      success={success}
                      type="タイムラインコメント"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-10">コメントはありません</div>
      )}
    </div>
  );
});
