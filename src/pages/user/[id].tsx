/* eslint-disable prefer-const */
import { useContext } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Tab } from "@headlessui/react";
import useSWR from "swr";
import Image from "next/image";

import { Button } from "../../components/Button/Button";
import { SubHeader } from "../../components/Layout/SubHeader";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";
import { ReviewCard } from "../../components/Lunch/ReviewCard";
import { TimelineHisCard } from "../../components/User/TimelineHisCard";
import { LikedCommentHis } from "../../components/User/LikedCommentHis";
import type {
  CommentHis,
  LunchReview,
  Timeline,
  Title,
  UserInfo,
} from "../../types/type";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
   * APIで初期表示用データ取得.
   */
  const {
    data: userInfo,
    error,
    mutate,
  } = useSWR(`${JAVA_API_URL}/user/${userId}/${hash}`);

  //ユーザー情報格納
  const userData: UserInfo = userInfo?.user;

  if (!error && !userInfo) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  //タブのタイトル
  const categories: Array<Title> = [
    { id: 1, title: "つぶやき" },
    { id: 2, title: "レビュー" },
    { id: 3, title: "いいね履歴つぶやき" },
    { id: 4, title: "いいね履歴レビュー" },
    { id: 5, title: "いいね履歴コメント" },
  ];

  return (
    <>
      <div className="flex mb-3">
        {/* ユーザー情報 */}
        <div className="w-full">
          <SubHeader title="ユーザー情報" />
          <div className="border-solid  border-2 border-bgc-200 m-3 shadow-lg rounded-md">
            {userInfo && (
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

          {/* <div className="w-full text-center mb-2">
            <Button
              label="投稿を再読み込み"
              size="lg"
              onClick={() => {
                alert("新しいつぶやき読み込み");
              }}
            />
          </div> */}

          {/* タブ（履歴表示欄） */}
          <div className="w-full px-2 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex p-1 space-x-1  rounded-xl shadow-lg ">
                {categories.map((category) => (
                  <Tab
                    key={category.id}
                    className={({ selected }) =>
                      classNames(
                        "w-full py-2.5 text-xs font-bold text-basic rounded-lg",
                        "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60",
                        selected
                          ? "bg-white shadow border-4 border-basic"
                          : "text-bgc bg-text-brown hover:text-basic hover:bg-white hover:bg-opacity-60 ",
                      )
                    }
                  >
                    {category.title}
                  </Tab>
                ))}
              </Tab.List>

              <Tab.Panels>
                {/* つぶやき履歴表示 */}
                <Tab.Panel className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none ">
                  <div>
                    {userInfo &&
                      userInfo.postedTimelineList.map(
                        (timelineHis: Timeline) => (
                          <TimelineHisCard
                            {...timelineHis}
                            type="つぶやき履歴"
                            key={timelineHis.id}
                          />
                        ),
                      )}
                  </div>
                </Tab.Panel>
                {/* つぶやき履歴表示ここまで */}

                {/* レビュー履歴 */}
                <Tab.Panel className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none ">
                  <div className="bg-white">
                    {userInfo &&
                      userInfo.postedReviewList.map((review: LunchReview) => (
                        <ReviewCard
                          {...review}
                          type="一覧"
                          isHistory
                          hasRestaurantInfo={true}
                          reviewsMutate={mutate}
                          key={review.id}
                        />
                      ))}
                  </div>
                </Tab.Panel>
                {/* レビュー履歴ここまで */}
                {/* いいね履歴つぶやき */}
                <Tab.Panel className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none ">
                  <div>
                    {userInfo &&
                      userInfo.likedTimelineList.map(
                        (likedTimelineHis: Timeline) => (
                          <TimelineHisCard
                            {...likedTimelineHis}
                            type="いいね履歴つぶやき"
                            key={likedTimelineHis.id}
                          />
                        ),
                      )}
                  </div>
                </Tab.Panel>
                {/* いいね履歴つぶやきここまで */}
                {/* いいね履歴レビュー */}
                <Tab.Panel className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none ">
                  <div className="bg-white">
                    {userInfo &&
                      userInfo.likedReviewList.map(
                        (likedReview: LunchReview) => (
                          <ReviewCard
                            {...likedReview}
                            type="一覧"
                            isHistory
                            hasRestaurantInfo={true}
                            reviewsMutate={mutate}
                            key={likedReview.id}
                          />
                        ),
                      )}
                  </div>
                </Tab.Panel>
                {/* いいね履歴レビューここまで */}
                {/* いいね履歴コメント */}
                <Tab.Panel className="bg-bgc shadow-lg  rounded-xl p-3 focus:outline-none ">
                  <div>
                    {userInfo &&
                      userInfo.likedCommentList.map(
                        (likedCommentHis: CommentHis) => (
                          <LikedCommentHis
                            {...likedCommentHis}
                            type="いいね履歴つぶやき"
                            key={likedCommentHis.id}
                          />
                        ),
                      )}
                  </div>
                </Tab.Panel>
                {/* いいね履歴コメントここまで */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
