import { FC, Fragment, memo, useCallback, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "../Button/Button";
import { JAVA_API_URL } from "../../utils/const";
import { loginIdContext } from "../../providers/LoginIdProvider";

type Props = {
  postId: number; //投稿ID
  type:
    | "タイムライン"
    | "タイムラインコメント"
    | "レビュー"
    | "レビューコメント"; //レビューかタイムラインか
  success?: () => void; //削除成功後にデータ再読み込み
  modalStatus: boolean; //モーダルの開閉状況
  closeModal: () => void;
};

/**
 * 投稿削除をするためのモーダル.
 * @returns 投稿削除をするためのモーダル
 */
export const DeletePostModal: FC<Props> = memo((props) => {
  const { postId, type, success, modalStatus, closeModal } = props;
  //ログインID
  const loginId = useContext(loginIdContext);

  /**
   * はいボタン押下で発動.(未実装)
   */
  const deletePost = useCallback(async () => {
    try {
      //タイムラインに対する削除
      if (type === "タイムライン") {
        const res = await axios.delete(
          `${JAVA_API_URL}/timeline/${postId}/${loginId}`,
        );
        if (res.data.status === "success") {
          toast.success("削除しました");
          //リロード
          if (success) {
            success();
          }
          closeModal();
        } else {
          toast.error(res.data.message);
          closeModal();
        }
      }

      //タイムラインコメントに対する削除
      if (type === "タイムラインコメント") {
        const res = await axios.delete(
          `${JAVA_API_URL}/timeline/comment/${postId}/${loginId}`,
        );
        if (res.data.status === "success") {
          toast.success("削除しました");
          //リロード
          if (success) {
            success();
          }
          closeModal();
        } else {
          toast.error(res.data.message);
          closeModal();
        }
      }

      //レビューに対する削除
      if (type === "レビュー") {
        const res = await axios.delete(`${JAVA_API_URL}/review/${postId}`, {
          data: {
            userLogicalId: loginId,
          },
        });
        if (res.data.status === "success") {
          toast.success("削除しました");
          // レビュー一覧再取得
          if (success) {
            success();
          }
          closeModal();
        } else {
          toast.error(res.data.message);
          closeModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [closeModal, loginId, postId, success, type]);

  return (
    <>
      <Transition appear show={modalStatus} as={Fragment}>
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
