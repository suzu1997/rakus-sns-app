import { useCallback, Fragment, FC, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../Button/Button";
import axios from "axios";

type Props = {
  isOpen: boolean; // モーダルが開いているかどうか
  closeModal: () => void; // モーダルを閉じるメソッド
  postId: number; //投稿ID
};

/**
 * 投稿削除をするためのモーダル.
 * @returns 投稿削除をするためのモーダル
 */
export const DeletePostModal: FC<Props> = memo((props) => {
  const { isOpen, closeModal, postId } = props;

  /**
   * はいボタン押下で発動.
   */
  const deletePost = useCallback(async () => {
    alert("投稿ID" + postId + "を削除しました");
    // try {
    //   const res = await axios.post("http://localhost:8080/signup");
    //   console.log(JSON.stringify(res.data));
    //   if (res.data.status === "success") {
    //     console.log(res.data.status);
    //     //成功→タイムラインページに戻る
    //     closeModal();
    //   } else {
    //     alert(res.data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

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
                  投稿を削除しますか？
                </Dialog.Title>
                <div className="text-center mt-5 mr-3">
                  <Button color="#622d18" label={"はい"} onClick={deletePost} />
                  <span className="ml-5">
                    <Button
                      backgroundColor="#f6f0ea"
                      color="#622d18"
                      label={"キャンセル"}
                      onClick={closeModal}
                    />
                  </span>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
