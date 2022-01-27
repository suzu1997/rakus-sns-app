import { FC, memo, useEffect, useState, useContext, Fragment } from "react";
import Image from "next/image";
import useSWR from "swr";
import { Dialog, Transition } from "@headlessui/react";

import { Button } from "../Button/Button";
import { TextArea } from "../Form/TextArea";
import { SelectBox } from "../Form/SelectBox";
import { JAVA_API_URL } from "../../utils/const";
import { starOptions } from "../../utils/options";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { usePostValue } from "../../hooks/usePostValue";
import { useTimelinePost } from "../../hooks/useTimelinePost";
import { useTimelineCommentPost } from "../../hooks/useTimelineCommentPost";
import { useReviewPost } from "../../hooks/useReviewPost";
import { useReviewCommentPost } from "../../hooks/useReviewCommentPost";

type Props = {
  isOpen: boolean; // モーダルが開いているかどうか
  closeModal: () => void; // モーダルを閉じるメソッド
  title: "レビュー" | "つぶやき" | "タイムラインコメント" | "レビューコメント"; // レビュー/つぶやき/コメント
  restaurantId?: number; // 店のID(レビュー投稿なら渡ってくる)。投稿の際にAPIに渡す。
  postId?: number; // タイムラインもしくはレビューのID(コメント投稿なら渡ってくる)。投稿の際にAPIに渡す
  success: () => void; //投稿完了後、自動で更新したい場合は更新のメソッドを渡す
};

/**
 * つぶやきもしくはレビューもしくはコメントを投稿するためのモーダルのコンポーネント.
 */
export const PostModal: FC<Props> = memo((props) => {
  const {
    isOpen,
    closeModal,
    title,
    restaurantId = 0,
    postId = 0,
    success,
  } = props;

  const { post, setPost, inputPost, postLength } = usePostValue();
  const { timelinePost } = useTimelinePost();
  const { timelineCommentPost } = useTimelineCommentPost();
  const { reviewPost } = useReviewPost();
  const { reviewCommentPost } = useReviewCommentPost();

  // ログイン中のユーザーidを取得
  const { hash } = useContext(loginIdContext);
  const { loginId } = useContext(loginIdContext);

  // 選択した星の数を格納するstate
  const [star, setStar] = useState(starOptions[0]);

  /**
   * 入力内容を投稿するメソッド.
   * @remarks API完成したらこのメソッド内で送信.
   * titleによって投稿するAPIを変える。
   */
  const sendPost = async () => {
    if (post === "") {
      alert("入力して下さい");
      return;
    }
    if (post.length > 140) {
      alert(`${title}は140文字以内にして下さい`);
      return;
    }

    //レビュー投稿
    if (title === "レビュー") {
      reviewPost(post, star, restaurantId, success, title);
      closeModal();
      setPost("");
    }

    if (title === "レビューコメント") {
      reviewCommentPost(postId, post, success);
      closeModal();
      setPost("");
    }

    //タイムライン投稿
    if (title === "つぶやき") {
      timelinePost(post, success);
      closeModal();
      setPost("");
    }

    if (title === "タイムラインコメント") {
      timelineCommentPost(postId, post, success);
      closeModal();
      setPost("");
    }
  };

  /**
   * APIを使用して画像データ取得.
   */
  const { data } = useSWR(`${JAVA_API_URL}/user/${loginId}/${hash}`);
  // 個人情報をdataから抽出
  const [userPhoto] = useState<string>(data?.user.userPhotoPath);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          {/* モーダルの背景を暗くする */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* モーダルを画面の中央に配置するための要素 */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {/* モーダルの中身部分 */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg sm:max-w-2xl p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-text-brown text-center"
                >
                  {title}を投稿
                </Dialog.Title>
                {/* レビューの登録なら、星の数を選択してもらう */}
                <div className="mt-2">
                  <div className="mt-10">
                    {title === "レビュー" && (
                      <div className="flex gap-3 items-center mb-3">
                        評価: 星
                        <SelectBox
                          selectedOption={star}
                          select={setStar}
                          options={starOptions}
                        />
                        つ
                      </div>
                    )}
                    {title}内容を下記に入力して下さい。(140字以内)
                  </div>
                  <div className="flex flex-col sm:flex-row mt-5">
                    <div className="ml-5">
                      {userPhoto ? (
                        <>
                          <Image
                            src={`/image/userIcon/${userPhoto}`}
                            width={100}
                            height={100}
                            alt="icon"
                            className="rounded-full"
                          />
                        </>
                      ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center pl-5 mb-5">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="sm:mx-5">
                      <form>
                        <TextArea
                          value={post}
                          rows={10}
                          cols={28}
                          onChange={inputPost}
                        />
                      </form>
                      <span className={`${postLength < 0 && "text-red-700"}`}>
                        残り文字数：{postLength}
                      </span>
                    </div>
                  </div>
                </div>
                {/* 投稿/キャンセルのボタン */}
                <div className="mt-4 flex gap-5 justify-center">
                  <Button label={"投稿"} onClick={sendPost} />
                  <Button
                    backgroundColor="#f6f0ea"
                    color="#622d18"
                    label={"キャンセル"}
                    onClick={closeModal}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
