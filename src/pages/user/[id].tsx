import { NextPage } from "next";
import { useCallback, useState } from "react";
import { MenuBar } from "../../components/MenuBar";
import Image from "next/image";
import { SubHeader } from "../../components/SubHeader";
import { Tab } from "@headlessui/react";
import { Button } from "../../components/Button";
import { useRouter } from "next/router";

//タブテスト
function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * ユーザー情報画面
 * @returns ユーザー情報を表示するページ
 */
const User: NextPage = () => {
  //テストデータ
  const [data] = useState({
    name: "ランチックス",
    hireDate: "2021年10月",
    img: "/usakus.jpg",
    jobtype: "FR",
  });

  //ルーターリンク
  const router = useRouter();

  //編集ボタンを押した時に呼ばれる
  const editInfo = () => {
    router.push("/user/edit");
  };

  //タブテストデータ
  // eslint-disable-next-line prefer-const
  let [categories] = useState({
    つぶやき履歴: [
      {
        id: 1,
        title: "おはよう",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "こんにちは",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    投稿履歴: [
      {
        id: 1,
        title: "やあ",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "よっ",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    いいね履歴: [
      {
        id: 1,
        title: "ありがとう",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "さようなら",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  const goDetailPage = useCallback((postId: number) => {
    if (postId > 100) {
      router.push(`/timeline/${postId}`);
    } else {
      router.push(`/lunch/review/${postId}`);
    }
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        {/* ユーザー情報 */}
        <div className="w-full">
          <SubHeader title="ユーザー情報" />
          <div className="border-solid  border-2 border-bgc-200 m-5 shadow-lg rounded-md">
            <div className=" text-center">
              <div className="mt-3 text-xl font-bold">名前:{data.name}</div>
              <div className="w-12/12">
                <Image
                  src={data.img}
                  width={100}
                  height={100}
                  alt="icon"
                ></Image>
              </div>
              <div>
                <div>入社日:{data.hireDate}</div>
                <div>職種:{data.jobtype}</div>
                <div>アカウント名:</div>
                <div>誕生日:</div>
                <div>自己紹介:</div>
              </div>
            </div>
            <div className="text-right mr-10 mb-5">
              <Button
                label="プロフィール編集"
                backgroundColor="#f28728"
                color="white"
                size="md"
                onClick={editInfo}
              />
            </div>
          </div>

          {/* タブテスト（履歴表示欄） */}
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                {Object.keys(categories).map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-sm leading-5 font-medium text-bgc rounded-lg",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 bg-text-brown",
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
                {Object.values(categories).map((posts, idx) => (
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

                        <div className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                          <span>{post.date}</span>
                          &middot;
                          <span>{post.commentCount} comments</span>
                          &middot;
                          <span>{post.shareCount} shares</span>
                          {/* <Link href="/">
                            <a className="absolute inset-0 rounded-md focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"></a>
                          </Link> */}
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
