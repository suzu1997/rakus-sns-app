/* eslint-disable prefer-const */
import { NextPage } from "next";
import { useCallback, useContext, useState } from "react";
import Image from "next/image";
import { SubHeader } from "../../components/Layout/SubHeader";
import { Tab } from "@headlessui/react";
import { Button } from "../../components/Button/Button";
import { useRouter } from "next/router";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { UserInfo } from "../../types/type";

//タブテスト
// function classNames(...classes: unknown[]) {
//   return classes.filter(Boolean).join(" ");
// }

/**
 * ユーザー情報画面
 * @returns ユーザー情報を表示するページ
 */
const User: NextPage = () => {
  // テストデータ
  const [datas] = useState({
    // name: "ランチックス",
    // hireDate: "2021年10月",
    img: "/usakus.jpg",
    // jobtype: "FR",
    introduction:
      "ああああああああああああああああああああああああああああああああああああああああああああ",
  });

  //ルーターリンク
  const router = useRouter();

  //URLの後ろからid取得
  const userId = Number(router.query.id);

  //ログインID
  const { loginId } = useContext(loginIdContext);
  const { hash } = useContext(loginIdContext);

  //編集ボタンを押した時に呼ばれる
  const editInfo = () => {
    router.push("/user/edit");
  };

  //タブテストデータ
  // eslint-disable-next-line prefer-const
  let [categories] = useState({
    つぶやき: [
      {
        id: 1,
        title: "おはよう",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 2,
        title: "こんにちは",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 3,
        title: "おはよう",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 4,
        title: "こんにちは",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 5,
        title: "おはよう",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 6,
        title: "こんにちは",
        text: "あああああ",
        subtext: "ううううううう",
      },
    ],
    投稿: [
      {
        id: 1,
        title: "やあ",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 2,
        title: "よっ",
        text: "あああああ",
        subtext: "ううううううう",
      },
    ],
    いいね履歴つぶやき: [
      {
        id: 1,
        title: "つぶやきのいいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 2,
        title: "いいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 3,
        title: "つぶやきのいいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 4,
        title: "いいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 5,
        title: "つぶやきのいいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 6,
        title: "いいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
    ],
    いいね履歴投稿: [
      {
        id: 1,
        title: "つぶやきのいいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 2,
        title: "投稿のいいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
    ],
    いいね履歴コメント: [
      {
        id: 1,
        title: "つぶやきのいいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
      {
        id: 2,
        title: "投稿のいいね",
        text: "あああああ",
        subtext: "ううううううう",
      },
    ],
  });

  /**
   * 押下投稿の詳細に画面遷移.
   * @remarks IDによって遷移先をタイムラインページかレビューページに分ける
   */
  const goDetailPage = useCallback((postId: number) => {
    if (postId > 100) {
      router.push(`/timeline/${postId}`);
    } else {
      router.push(`/lunch/review/${postId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * APIで初期表示用データ取得.
   */
  const { data: payload, error } = useSWR(`${JAVA_API_URL}/user/${hash}`);
  const userDatas = payload?.user;

  if (!error && !userDatas) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  const userData: UserInfo = userDatas;

  return (
    <>
      <div className="flex mb-3">
        {/* ユーザー情報 */}
        <div className="w-full">
          <SubHeader title="ユーザー情報" />
          <div className="border-solid  border-2 border-bgc-200 m-3 shadow-lg rounded-md">
            {userData && (
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
                  <div>職種:{userData.serviceFk}</div>
                  <div>誕生日:{userData.birthDay}</div>
                  <div>自己紹介:{datas.introduction}</div>
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
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className="w-full py-2.5 text-xs font-bold  text-bgc rounded-lg bg-text-brown focus:text-basic focus:bg-bgc hover:text-basic "
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                {Object.values(categories).map((posts, idx) => (
                  <Tab.Panel
                    key={idx}
                    className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none "
                  >
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="focus:outline-none rounded-xl border border-t-1 mt-1 border-blue-100 bg-white relative p-3 hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
                        onClick={() => {
                          goDetailPage(post.id);
                        }}
                      >
                        <div className="text-sm font-medium leading-5">
                          {post.title}
                        </div>
                        <div className="text-sm font-medium leading-5">
                          {post.text}
                        </div>
                        <div className="text-sm font-medium leading-5">
                          {post.subtext}
                        </div>
                      </div>
                    ))}
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
