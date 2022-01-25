import Image from "next/image";
import type { NextPage } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import { SubHeader } from "../../components/Layout/SubHeader";
import { Button } from "../../components/Button/Button";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
//自分のつぶやきを消せるボタンコンポーネント(自分のつぶやきの時のみ表示させたい)
import { TrashBtn } from "../../components/Button/TrashBtn";
import { useRouter } from "next/router";
import { PostBtn } from "../../components/Button/PostBtn";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { Timeline } from "../../types/type";
import axios from "axios";
import toast from "react-hot-toast";
import { useSWRTimeline } from "../../hooks/useSWRTimeline";

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
  const { timelineMutate } = useSWRTimeline(loginId);

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
   * APIを使用してタイムラインデータを取得.
   */
  const { data, error, mutate } = useSWR(`${JAVA_API_URL}/timeline/${loginId}`);
  // タイムライン情報をdataから抽出
  const timelineData: Timeline = data?.TimelineList;
  const message = data?.message;

  /**
   * タイムラインの情報を更新するメソッド.
   *
   * @remarks
   * 投稿が成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    timelineMutate(); // タイムライン一覧を再検証・再取得する
    mutate(); // タイムライン情報を再検証・再取得する
  }, [mutate, timelineMutate]);

  /**
   * 古い投稿の読み込み直し.
   */
  const getOldData = useCallback(async () => {
    //データの最後のidを取得
    const oldNumber = timelineData?.length - 1;
    const oldId = timelineData?.[oldNumber].id;
    try {
      const res = await axios.get(
        `${JAVA_API_URL}/timeline/old/${oldId}/${loginId}`,
      );
      const oldList: Timeline = res.data.TimelineList;
      //取得した古いリストが空だったらreturn(lengthが上手く取れないのでこのような処理)
      if (!oldList[0]) {
        toast.success("過去の投稿はありません");
        return;
      }
      //空でなければ既存のリストに追加
      for (const oldData of oldList) {
        timelineData.push(oldData);
      }
      toast.success("過去の投稿を読み込みました");
    } catch (error) {
      console.log(error);
    }
  }, [loginId, timelineData]);

  //初期値エラー
  if (!error && !timelineData) {
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
      {timelineData && (
        <div>
          {/* サブヘッダー */}
          <SubHeader title="タイムライン" />
          {/* タイムラインゾーン */}
          <div className="text-center my-10 animate-bounce">
            <Button
              label="新しいつぶやきを読み込む"
              size="lg"
              onClick={() => {
                updateData;
                toast.success("新しい投稿を読み込みました");
              }}
            />
          </div>
          {timelineData.map((value, key) => (
            <div key={key} className="flex border border-t-0 border-gray-200">
              <div
                className="rounded-full w-1/5 text-center pt-5 cursor-pointer hover:opacity-50"
                onClick={() => {
                  goUserPage(value.userId);
                }}
              >
                <Image
                  src={`/image/userIcon/${value.userPhotoPath}`}
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
                    goDetailPage(value.id);
                  }}
                >
                  <div className="text-xl font-extrabold pt-3 pb-3">
                    {value.accountName}
                  </div>
                  <div className="pt-5 pb-5 pl-5 w-8/12">{value.sentence}</div>
                </div>

                <div className="w-full text-right py-3">
                  <CommentIcon
                    commentCount={value.commentCount}
                    postId={value.id}
                    target="timeline"
                  />
                  <FavoBtn
                    postId={value.id}
                    favoCount={value.likeCount}
                    isFavo={value.myLike}
                    type={message}
                    success={updateData}
                  />
                  <TrashBtn
                    postId={value.id}
                    type="タイムライン"
                    success={updateData}
                  />
                </div>
              </div>
            </div>
          ))}
          <div
            className="text-text-brown text-center my-5 cursor-pointer hover:text-basic"
            onClick={getOldData}
          >
            過去の投稿を見る…
          </div>
          <div>
            <PostBtn success={updateData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Timeline;
