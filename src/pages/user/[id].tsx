/* eslint-disable prefer-const */
import { NextPage } from "next";
import { useCallback, useContext, useState } from "react";
import Image from "next/image";
import { SubHeader } from "../../components/Layout/SubHeader";
import { Tab, Transition } from "@headlessui/react";
import { Button } from "../../components/Button/Button";
import { useRouter } from "next/router";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { UserInfo } from "../../types/type";

//タブテスト
function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

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

  //いいね履歴タブの表示
  const [isOpenHis, setIsOpenHis] = useState(false);

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
  let [categoriesA] = useState({
    つぶやき履歴: [
      {
        id: 1,
        title: "おはよう",
      },
      {
        id: 2,
        title: "こんにちは",
      },
    ],
    投稿履歴: [
      {
        id: 1,
        title: "やあ",
      },
      {
        id: 2,
        title: "よっ",
      },
    ],
    いいね履歴: [{ id: 1, title: "履歴の詳細は以下からご覧ください" }],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [categoriesB] = useState({
    つぶやきいいね履歴: [
      {
        id: 1,
        title: "つぶやきのいいね",
      },
      {
        id: 2,
        title: "いいね",
      },
    ],
    投稿いいね履歴: [
      {
        id: 1,
        title: "つぶやきのいいね",
      },
      {
        id: 2,
        title: "投稿のいいね",
      },
    ],
    コメントいいね履歴: [
      {
        id: 1,
        title: "つぶやきのいいね",
      },
      {
        id: 2,
        title: "投稿のいいね",
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

  const tabOpen = (categories: string) => {
    if (categories === "いいね履歴") {
      setIsOpenHis(true);
    } else {
      setIsOpenHis(false);
    }
  };

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
              <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                {Object.keys(categoriesA).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm font-bold leading-5 font-medium text-bgc rounded-lg",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 bg-text-brown",
                        selected
                          ? "bg-white shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-basic",
                      )
                    }
                  >
                    <div
                      onClick={() => {
                        tabOpen(category);
                      }}
                    >
                      {category}
                    </div>
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels className="mt-2">
                {Object.values(categoriesA).map((posts, idx) => (
                  <Tab.Panel
                    key={idx}
                    className="bg-bgc rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                  >
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="focus:outline-none relative p-3 rounded-md hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
                        onClick={() => {
                          goDetailPage(post.id);
                        }}
                      >
                        <h3 className="text-sm font-medium leading-5">
                          {post.title}
                        </h3>

                        <div className="flex space-x-1 text-xs font-normal leading-4 text-coolGray-500"></div>
                      </div>
                    ))}
                  </Tab.Panel>
                ))}
              </Tab.Panels>

              {/* 2回目 */}
              <div>
                <Transition appear show={isOpenHis}>
                  <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                    {Object.keys(categoriesB).map((category) => (
                      <Tab
                        key={category}
                        className={({ selected }) =>
                          classNames(
                            "w-full py-2.5 text-xs font-bold leading-5 font-medium text-bgc rounded-lg",
                            "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-red-400 ring-white ring-opacity-60 bg-text-brown",
                            selected
                              ? "bg-white shadow"
                              : "text-blue-100 hover:bg-white/[0.12] hover:text-basic",
                          )
                        }
                      >
                        {category}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {Object.values(categoriesB).map((posts, idx) => (
                      <Tab.Panel
                        key={idx}
                        className="bg-bgc rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                      >
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            className="focus:outline-none relative p-3 rounded-md hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
                            onClick={() => {
                              goDetailPage(post.id);
                            }}
                          >
                            <h3 className="text-sm font-medium leading-5">
                              {post.title}
                            </h3>

                            <div className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500"></div>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Transition>
              </div>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
