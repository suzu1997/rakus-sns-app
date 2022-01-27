import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

import { FavoBtn } from "../Button/FavoBtn";
import { TrashBtn } from "../Button/TrashBtn";
import { TimelineComment } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";

type Props = {
  postId: number; //コメントリスト
};

/**
 * タイムライン詳細ページのコメントコンポーネント.
 */
export const CommentList: FC<Props> = memo((props) => {
  const { postId } = props;

  //ログインID
  const { hash } = useContext(loginIdContext);
  const { loginId } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  /**
   * コメントリスト取得.
   */
  const { data: timelineDetail } = useSWR(
    `${JAVA_API_URL}/timeline/detail/${postId}/${hash}`,
  );
  const [commentList, setCommentList] = useState<TimelineComment>(
    timelineDetail.commentList,
  );

  /**
   * 投稿の読み込み直し.
   */
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(
        `${JAVA_API_URL}/timeline/detail/${postId}/${hash}`,
      );
      // タイムライン情報をdataから抽出
      setCommentList(res.data.commentList);
    } catch (error) {
      console.log(error);
    }
  }, [postId, hash]);

  /**
   * リロード問題解消用.
   */
  useEffect(() => {
    getData();
  }, [getData]);

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
    <>
      <div>
        {commentList.map((value, key) => (
          <div key={key} className="flex border border-t-0 border-gray-200 ">
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
              <div className="w-full text-right py-3 pr-10">
                <FavoBtn
                  postId={value.id}
                  favoCount={value.commentLikeCount}
                  success={getData}
                  isFavo={value.myLike}
                  type="タイムラインコメント"
                />
                {Number(loginId) === value.userId && (
                  <TrashBtn
                    postId={value.id}
                    success={getData}
                    type="タイムラインコメント"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});
