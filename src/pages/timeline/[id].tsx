import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button } from "../../components/Button/Button";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
import { PostBtn } from "../../components/Button/PostBtn";
import { TrashBtn } from "../../components/Button/TrashBtn";
import { SubHeader } from "../../components/Layout/SubHeader";
import Image from "next/image";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { Timeline } from "../../types/type";
import { loginIdContext } from "../../providers/LoginIdProvider";

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
  console.dir(JSON.stringify(data));

  //つぶやき詳細データ
  const [detailData] = useState(data.timeline);
  //コメントリスト
  const [commentList] = useState(data.commentList);

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
      <div className="mx-5 mt-10">
        <div>
          <div className="px-3 flex">
            <div className="w-3/12 cursor-pointer hover:opacity-50">
              <Image
                src={data.img}
                width={200}
                height={200}
                alt="icon"
                onClick={() => {
                  goUserPage(data.userId);
                }}
                className="rounded-full"
              />
            </div>
            <div className="w-9/12">
              <div className="text-xl font-extrabold py-3 ml-3">
                {data.name}
              </div>
              <div className="w-8/12 ml-5">{data.tweet}</div>
            </div>
          </div>

          <div className="text-right pb-5" style={style}>
            <div className="flex flex-col items-end gap-3 sm:flex-row justify-end mr-5 mt-5">
              <div className="mr-5">投稿日時：{data.time}</div>
              <div>
                <CommentIcon
                  commentCount={300}
                  postId={data.postId}
                  target="timeline"
                />
                <FavoBtn postId={data.postId} favoCount={30} />
                {loginId == data.userId && <TrashBtn postId={data.postId} />}
              </div>
            </div>
          </div>
        </div>

        {data.comment.map((value, key) => (
          <div style={style} key={key} className="flex">
            <div className="w-1/5 text-center pt-5 cursor-pointer hover:opacity-50">
              <Image
                src={value.img}
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
                {value.name}
              </div>
              <div className="pt-5 pb-5 pl-5 w-8/12">{value.tweet}</div>
              <div className="w-full text-right py-3 pr-5">
                <FavoBtn postId={value.postId} favoCount={30} />
                {loginId == value.userId && <TrashBtn postId={value.postId} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <PostBtn />
      </div>
    </>
  );
};

export default TweetDetail;
