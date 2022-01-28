/* eslint-disable prefer-const */
import { useCallback, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import useSWR from "swr";
import Image from "next/image";

import { Button } from "../../components/Button/Button";
import { SubHeader } from "../../components/Layout/SubHeader";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";
import { Timeline, Title, UserInfo } from "../../types/type";
import { getFormattedDate } from "../../utils/methods";
import { CommentIcon } from "../../components/Button/CommentIcon";
import { FavoBtn } from "../../components/Button/FavoBtn";
import { TrashBtn } from "../../components/Button/TrashBtn";

/**
 * ユーザー情報画面
 * @returns ユーザー情報を表示するページ
 */
const User: NextPage = () => {
  //ログインID
  const { loginId } = useContext(loginIdContext);
  const { hash } = useContext(loginIdContext);
  //ルーターリンク
  const router = useRouter();

  //URLの後ろからid取得
  const userId = Number(router.query.id);

  //編集ボタンを押した時に呼ばれる
  const editInfo = () => {
    router.push("/user/edit");
  };

  /**
   * 画像クリックで投稿ユーザ情報ページに飛ぶ.
   * @param userId - 投稿者ID
   */
  const goUserPage = useCallback(
    (userId: number) => {
      router.push(`/user/${userId}`);
    },
    [router],
  );

  /**
   * 押下投稿の詳細に画面遷移.
   * @remarks 受け取った記事IDの詳細画面に遷移
   */
  const goDetailTimelinePage = useCallback(
    (postId: number) => {
      router.push(`/timeline/${postId}`);
      // router.push(`/lunch/review/${postId}`);
    },
    [router],
  );

  /**
   * APIで初期表示用データ取得.
   */
  const {
    data: payload,
    error,
    mutate,
  } = useSWR(`${JAVA_API_URL}/user/${userId}/${hash}`);

  /**
   * 履歴表示一覧の情報を更新するメソッド.
   *
   * @remarks
   * 成功すると呼ばれる。
   */
  const updateData = useCallback(() => {
    mutate(); // 履歴一覧を再検証・再取得する
  }, [mutate]);

  //ユーザー情報格納
  const userDatas = payload?.user;
  //型定義
  const userData: UserInfo = userDatas;

  //つぶやき履歴格納
  const timelineHisDatas = payload;

  if (!error && !payload) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  //タブのタイトル
  const categories: Array<Title> = [
    { id: 1, title: "つぶやき" },
    { id: 2, title: "投稿" },
    { id: 3, title: "いいね履歴つぶやき" },
    { id: 4, title: "いいね履歴投稿" },
    { id: 5, title: "いいね履歴コメント" },
  ];

  return (
    <>
      <div className="flex mb-3">
        {/* ユーザー情報 */}
        <div className="w-full">
          <SubHeader title="ユーザー情報" />
          <div className="border-solid  border-2 border-bgc-200 m-3 shadow-lg rounded-md">
            {payload && (
              <div className=" text-center">
                <div className="mt-1 text-xl font-bold">
                  アカウント名:{userData.accountName}
                </div>
                <div className="w-12/12">
                  <Image
                    src={`/image/userIcon/${userData.userPhotoPath}`}
                    width={80}
                    height={80}
                    alt="icon"
                    className="rounded-full"
                  ></Image>
                </div>
                <div>
                  <div>名前:{userData.name}</div>
                  <div>入社日:{userData.hireDate}</div>
                  <div>職種:{userData.serviceName}</div>
                  <div>誕生日:{userData.birthDay}</div>
                  <div>自己紹介:{userData.introduction}</div>
                </div>
              </div>
            )}
            {userId == loginId && (
              <div className="text-right mr-10 mb-5">
                <Button
                  label="プロフィール編集"
                  backgroundColor="#f28728"
                  color="white"
                  size="md"
                  onClick={editInfo}
                />
              </div>
            )}
          </div>

          <div className="w-full text-center mb-2">
            <Button
              label="投稿を再読み込み"
              size="lg"
              onClick={() => {
                alert("新しいつぶやき読み込み");
              }}
            />
          </div>

          {/* タブ（履歴表示欄） */}
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1  rounded-xl shadow-lg ">
                {categories.map((category) => (
                  <Tab
                    key={category.id}
                    className="w-full py-2.5 text-xs font-bold  text-bgc rounded-lg bg-text-brown focus:text-basic focus:bg-bgc hover:text-basic "
                  >
                    {category.title}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                {/* つぶやき履歴表示 */}
                <Tab.Panel className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none ">
                  <div>
                    {payload &&
                      timelineHisDatas.postedTimelineList.map(
                        (timeline: Timeline) => (
                      <div
                            key={timeline.id}
                            className=" border border-t-1 mt-1 border-blue-100text-sm font-medium leading-5 focus:outline-none rounded-xl bg-white relative p-3 "
                          >
                            <div
                              className="hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
                              onClick={() => {
                                goDetailTimelinePage(timeline.id);
                              }}
                            >
                              <span className="text-xl font-extrabold pt-3 pb-3">
                                {timeline.accountName}
                              </span>
                              <span className="ml-7">
                                つぶやき日時:
                                {getFormattedDate(
                                  new Date(timeline.postedTime),
                                )}
                              </span>
                            </div>
                            <div className="flex">
                              <span
                                className="rounded-full  pt-5 cursor-pointer hover:opacity-50"
                                onClick={() => {
                                  goUserPage(timeline.userId);
                                }}
                              >
                                <Image
                                  src={`/image/userIcon/${timeline.userPhotoPath}`}
                                  width={100}
                                  height={100}
                                  alt="icon"
                                  className="rounded-full"
                                />
                              </span>
                              <span
                                className="p-10 w-8/12 hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
                        onClick={() => {
                                  goDetailTimelinePage(timeline.id);
                        }}
                      >
                                {timeline.sentence}
                              </span>
                            </div>
                            <div className="w-full text-right py-3">
                              <CommentIcon
                                commentCount={timeline.commentCount}
                                postId={timeline.id}
                                success={updateData}
                                title="つぶやきにコメント"
                              />
                              <FavoBtn
                                postId={timeline.id}
                                favoCount={timeline.likeCount}
                                isFavo={timeline.myLike}
                                type="タイムライン"
                                success={updateData}
                              />
                              {Number(loginId) === timeline.userId && (
                                <TrashBtn
                                  postId={timeline.id}
                                  type="タイムライン"
                                  success={updateData}
                                />
                              )}
                            </div>
                      </div>
                        ),
                      )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
