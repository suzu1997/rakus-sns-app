import Image from "next/image";
import type { NextPage } from "next";
import { useCallback, useContext, useState } from "react";
import { SubHeader } from "../../components/Layout/SubHeader";
import { Button } from "../../components/Button/Button";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
//自分のつぶやきを消せるボタンコンポーネント(自分のつぶやきの時のみ表示させたい)
import { TrashBtn } from "../../components/Button/TrashBtn";
import { useRouter } from "next/router";
import { PostBtn } from "../../components/Button/PostBtn";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { Timeline } from "../../types/type";
import toast from "react-hot-toast";
import { useSWRTimeline } from "../../hooks/useSWRTimeline";
import { JAVA_API_URL } from "../../utils/const";
import useSWR from "swr";

/**
 * タイムラインページ.
 * @returns つぶやきの一覧が流れてくるページ
 */
const Timeline: NextPage = () => {
  //ログインID
  const loginId = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  // 投稿一覧を再検証・再取得する関数をhooksから取得
  const { data, error, loadMoreTimeline, timelineMutate } =
    useSWRTimeline(loginId);

  /**
   * ごみ箱ボタン表示非表示判断のため、ログインIDをハッシュ値→通常のIDに変換.
   */
  const { data: userInfo } = useSWR(`${JAVA_API_URL}/user/${loginId}`);
  const [trashCheckId] = useState(userInfo?.user.id);

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  /**
   * 投稿クリックで投稿詳細ページに飛ぶ.
   * @param postId - 投稿ID
   */
  const goDetailPage = (postId: number) => {
    router.push(`/timeline/${postId}`);
  };

  /**
   * タイムラインの情報を更新するメソッド.
   *
   * @remarks
   * 投稿が成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    timelineMutate(); // タイムライン一覧を再検証・再取得する
  }, [timelineMutate]);

  //初期値エラー
  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データが取得できませんでした
      </div>
    );
  }

  //HTMLコーナー
  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="タイムライン" />
      {/* タイムラインゾーン */}
      {data &&
        // dataはページごとの連想配列の配列
        data.map((pageData) =>
          pageData?.TimelineList.map((timelime: Timeline) => {
            return (
              <div
                key={timelime.id}
                className="flex border border-t-0 border-gray-200"
              >
                <div
                  className="rounded-full w-1/5 text-center pt-5 cursor-pointer hover:opacity-50"
                  onClick={() => {
                    goUserPage(timelime.userId);
                  }}
                >
                  <Image
                    src={`/image/userIcon/${timelime.userPhotoPath}`}
                    width={100}
                    height={100}
                    alt="icon"
                    className="rounded-full"
                  />
                </div>
                <div className="w-4/5">
                  <div
                    className="cursor-pointer hover:opacity-50"
                    onClick={() => {
                      goDetailPage(timelime.id);
                    }}
                  >
                    <div className="text-xl font-extrabold pt-3 pb-3">
                      {timelime.accountName}
                    </div>
                    <div className="pt-5 pb-5 pl-5 w-8/12">
                      {timelime.sentence}
                    </div>
                  </div>

                  <div className="w-full text-right py-3">
                    <CommentIcon
                      commentCount={timelime.commentCount}
                      postId={timelime.id}
                      target="timeline"
                      success={updateData}
                    />
                    <FavoBtn
                      postId={timelime.id}
                      favoCount={timelime.likeCount}
                      isFavo={timelime.myLike}
                      type="タイムライン"
                      success={updateData}
                    />
                    {trashCheckId === timelime.userId && (
                      <TrashBtn
                        postId={timelime.id}
                        type="タイムライン"
                        success={updateData}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          }),
        )}

      <div
        className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
        onClick={loadMoreTimeline}
      >
        過去の投稿を見る…
      </div>
      <div>
        <PostBtn success={updateData} />
      </div>
    </>
  );
};

export default Timeline;
