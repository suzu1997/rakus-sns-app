import { useCallback, useContext, useEffect } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";

import { Button } from "../../components/Button/Button";
import { PostBtn } from "../../components/Button/PostBtn";
import { SubHeader } from "../../components/Layout/SubHeader";
import { CommentList } from "../../components/Timeline/CommentList";
import { TimelineDetailPage } from "../../components/Timeline/TimelineDetail";
import { loginIdContext } from "../../providers/LoginIdProvider";
import type { Timeline, Comment } from "../../types/type";
import { JAVA_API_URL } from "../../utils/const";
import { fetcher } from "../../utils/fetcher";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
/**
 * つぶやき詳細画面.
 * @returns つぶやき詳細画面
 */
const TweetDetail: NextPage<Props> = (props) => {
  const { initialData } = props;
  //ログインID
  const { hash } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  /**
   * 戻るボタン押下で発動.
   */
  const backPage = useCallback(() => {
    router.back();
  }, [router]);

  //URLの後ろからid取得
  const postId = Number(router.query.id);

  /**
   * APIを使用してタイムラインデータを取得.
   */
  const { data, error, mutate } = useSWR(
    `${JAVA_API_URL}/timeline/detail/${postId}/${hash}`,
    fetcher,
    { fallbackData: initialData },
  );

  /**
   * 通知画面から削除された投稿に遷移した場合のメソッド.
   */
  useEffect(() => {
    if (data?.message === "つぶやきが存在しません") {
      toast.error("投稿が削除された可能性があります");
      router.back();
    } else {
      return;
    }
  }, [data?.message, router]);

  //つぶやき詳細データ
  const detailData: Timeline = data?.timeline;
  const commentList: Array<Comment> = data?.commentList;

  /**
   * 投稿の読み込み直し.
   */
  const getData = useCallback(() => {
    mutate();
  }, [mutate]);

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

  return (
    <>
      {/* サブヘッダー */}
      <SubHeader title="つぶやき詳細" />

      <div className="my-3 ml-3">
        <Button label="←戻る" size="sm" onClick={backPage} />
      </div>

      {/* つぶやき詳細 */}
      {detailData && (
        <>
          <div className="w-full border border-t-0 border-gray-200">
            <div className="mx-5 mt-10">
              <TimelineDetailPage detailData={detailData} success={getData} />
            </div>
          </div>
          <div className="w-full">
            {CommentList && (
              <CommentList commentList={commentList} success={getData} />
            )}
          </div>
        </>
      )}
      <div>
        <PostBtn success={getData} />
      </div>
    </>
  );
};

// SSR
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const cookies = new Cookies(ctx.req.headers.cookie);
  const hash = cookies.get("hash");

  const postId = Number(ctx.query.id);
  const res = await fetch(`${JAVA_API_URL}/timeline/detail/${postId}/${hash}`);
  const initialData: Timeline = await res.json();

  return {
    props: { initialData },
  };
};

export default TweetDetail;
