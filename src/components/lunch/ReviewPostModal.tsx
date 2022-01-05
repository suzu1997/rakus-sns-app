import { FC, memo, useCallback, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../Button";
import Image from "next/image";

type Props = {
  isOpen: boolean; // モーダルが開いているかどうか
  closeModal: () => void; // モーダルを閉じるメソッド
};

/**
 * レビューを投稿するためのモーダルのコンポーネント.
 */
export const ReviewPostModal: FC<Props> = memo((props) => {
  const { isOpen, closeModal } = props;

  // レビュー内容を格納するstate
  const [review, setReview] = useState<string>("");
  //レビューの文字数数える変数
  const [reviewLength, setReviewLength] = useState<number>(0);

  /**
   * レビュー内容をstateに格納する.
   */
  const inputReview = useCallback(
    (e) => {
      setReview(e.target.value);
    },
    [setReview],
  );

  /**
   * レビューを投稿するメソッド.
   */
  const postReview = () => {
    if (review === "") {
      alert("入力して下さい");
    } else if (review.length > 140) {
      alert("レビューは140文字以内にして下さい");
    } else {
      closeModal();
      alert(`レビューを投稿しました\nレビュー内容: ${review}`);
      setReview("");
    }
  };

  /**
   * リアルタイムにレビューの文字数をカウントしてくれる.
   */
  useEffect(() => {
    setReviewLength(140 - review.length);
  }, [review.length]);

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
                  レビューを投稿
                </Dialog.Title>
                <div className="mt-2">
                  <div className="mt-10">
                    レビュー内容を下記に入力して下さい。(140字以内)
                  </div>
                  <div className="flex mt-5">
                    <div className="ml-5">
                      <Image
                        src="/usakus.jpg"
                        width={100}
                        height={100}
                        alt="icon"
                        className="rounded-full"
                      />
                    </div>
                    <div className="mx-5">
                      <form>
                        <textarea
                          value={review}
                          onChange={inputReview}
                          rows={5}
                          cols={28}
                          className="p-5 focus:outline-none focus:border-basic border border-gray-300 shadow-md outline-none"
                        ></textarea>
                      </form>
                      <span className={`${reviewLength < 0 && "text-red-700"}`}>残り文字数：{reviewLength}</span>
                    </div>
                  </div>
                </div>
                {/* 投稿/キャンセルのボタン */}
                <div className="mt-4 flex gap-5 justify-center">
                  <Button label={"投稿"} onClick={postReview} />
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
