import { NextPage } from "next";
import { useCallback, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../../components/Button/Button";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

/**
 * ログアウトページ.
 * @returns ログアウトページ
 */
const Logout: NextPage = () => {
  //ルーターリンク
  const router = useRouter();

  //モーダル開け閉めフラグ
  const [isOpen, setIsOpen] = useState(true);

  /**
   * キャンセルボタン押下で発動.
   */
  const closeModal = useCallback(() => {
    //モーダルを閉じる
    setIsOpen(false);
    //元のページに戻る
    router.back();
  }, [router]);

  /**
   * ログアウトボタン押下で発動.
   */
  const logout = useCallback(() => {
    //cookieを使用する
    const cookie = new Cookie();
    //cookieからログインID削除
    cookie.remove("hash");
    cookie.remove("loginId");
    //ログインページに戻る
    router.push("/auth/login");
  }, [router]);

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
                  ログアウトしますか？
                </Dialog.Title>
                <div className="flex flex-row justify-center mt-5">
                  <div>
                    <Button color="#622d18" label={"はい"} onClick={logout} />
                  </div>
                  <div className="ml-5">
                    <Button
                      backgroundColor="#f6f0ea"
                      color="#622d18"
                      label={"キャンセル"}
                      onClick={closeModal}
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default Logout;
