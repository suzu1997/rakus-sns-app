import useSWR from "swr";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { PostBtn } from "../../components/Button/PostBtn";
import { SubHeader } from "../../components/Layout/SubHeader";
import { JAVA_API_URL } from "../../utils/const";
import { TimelineComment, TimelineDetail } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { CommentList } from "../../components/Timeline/CommentList";
import { TimelineDetailPage } from "../../components/Timeline/TimelineDetail";

/**
 * つぶやき詳細画面.
 * @returns つぶやき詳細画面
 */
const TweetDetail: NextPage = () => {
  //ログインID
  const loginId = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();
  /**
   * 戻るボタン押下で発動.
   */
  const backPage = () => {
    router.back();
  };

  //URLの後ろからid取得
  const postId = Number(router.query.id);

  /**
   * APIを使用してタイムラインデータを取得.(未実装)
   */
  const { data, error } = useSWR(
    `${JAVA_API_URL}/timeline/detail/${postId}/${loginId}`,
  );

  //つぶやき詳細データ
  const [detailData, setDetailData] = useState<TimelineDetail>(data?.timeline);
  //コメントリスト
  const [commentList] = useState<TimelineComment>(data?.commentList);
  console.dir(JSON.stringify(commentList));

  /**
   * 投稿の読み込み直し.
   */
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(
        `${JAVA_API_URL}/timeline/detail/${postId}/${loginId}`,
      );
      // タイムライン情報をdataから抽出
      setDetailData(res.data.timeline);
    } catch (error) {
      console.log(error);
    }
  }, [loginId, postId]);

  /**
   * リロード問題解消用.
   */
  useEffect(() => {
    getData();
  }, [getData]);

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
            <CommentList commentList={commentList} success={getData} />
          </div>
        </>
      )}
      <div>
        <PostBtn success={getData} />
      </div>
    </>
  );
};

export default TweetDetail;
