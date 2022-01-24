import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
import { PostBtn } from "../../components/Button/PostBtn";
import { TrashBtn } from "../../components/Button/TrashBtn";
import { SubHeader } from "../../components/Layout/SubHeader";
import Image from "next/image";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { Timeline, TimelineDtail } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";
import axios from "axios";

/**
 * つぶやき詳細画面.
 * @returns つぶやき詳細画面
 */
const TweetDetail: NextPage = () => {
  //ログインID
  const loginId = useContext(loginIdContext);

  const style = {
    borderBottom: "solid 1px black",
  };

  //ルーターリンク
  const router = useRouter();
  /**
   * 戻るボタン押下で発動.
   */
  const backPage = () => {
    router.back();
  };

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = (userId: number) => {
    router.push(`/user/${userId}`);
  };

  //URLの後ろからid取得
  const postId = Number(router.query.id);

  /**
   * APIを使用してタイムラインデータを取得.(未実装)
   */
  const { data, error } = useSWR(`${JAVA_API_URL}/timeline/detail/${postId}`);

  //つぶやき詳細データ
  const [detailData, setDetailData] = useState<TimelineDtail>(data?.timeline);
  //コメントリスト
  const [commentList] = useState<Timeline>(data?.commentList);

  /**
   * 投稿の読み込み直し.
   */
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(`${JAVA_API_URL}/timeline/detail/${postId}`);
      // タイムライン情報をdataから抽出
      setDetailData(res.data.Timeline);
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  /**
   * リロード問題解消用.
   */
  useEffect(() => {
    getData();
  }, [getData]);

  if (!error && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
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
        <div className="mx-5 mt-10">
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
                  {data.name}
                </div>
                <div className="w-8/12 ml-5">{detailData.sentence}</div>
              </div>
            </div>

            <div className="text-right pb-5" style={style}>
              <div className="flex flex-col items-end gap-3 sm:flex-row justify-end mr-5 mt-5">
                <div className="mr-5">投稿日時：{detailData.postedTime}</div>
                <div>
                  <CommentIcon
                    commentCount={detailData.commentCount}
                    postId={detailData.id}
                    target="timeline"
                  />
                  <FavoBtn
                    postId={data.postId}
                    favoCount={detailData.likeCount}
                  />
                  {loginId == data.userId && (
                    <TrashBtn postId={detailData.id} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {commentList ? (
            <div>
              {commentList.map((value, key) => (
                <div style={style} key={key} className="flex">
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
                    <div className="pt-5 pb-5 pl-5 w-8/12">
                      {value.sentence}
                    </div>
                    <div className="w-full text-right py-3 pr-5">
                      <FavoBtn postId={value.id} favoCount={value.likeCount} />
                      {loginId == value.userId && (
                        <TrashBtn postId={value.id} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>コメントはありません</div>
          )}
        </div>
      )}
      <div>
        <PostBtn />
      </div>
    </>
  );
};

export default TweetDetail;
