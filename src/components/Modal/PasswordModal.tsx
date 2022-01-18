import { FC, memo, useCallback, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../Button/Button";
import { TextInput } from "../Form/TextInput";
import { useRouter } from "next/router";
import { loginIdContext } from "../../providers/LoginIdProvider";

type Props = {
  isOpen: boolean; // モーダルが開いているかどうか
};

/**
 * パスワード変更のためのモーダルのコンポーネント.
 */
export const PasswordModal: FC<Props> = memo((props) => {
  const { isOpen } = props;

  //エラーメッセージ
  const [currentPasswordErrorMessage, setCurrentPasswordError] = useState("");
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [passwordConfErrorMessage, setPasswordConfErrorMessage] = useState("");

  //入力値
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  //本来APIから取得するログインユーザのパスワード
  const [password] = useState("aaaAAA1234567890");

  //各入力フォームに入力した際に更新される
  //現在のパスワード
  const currentPasswordValue = useCallback(
    (e) => {
      setCurrentPassword(e.target.value);
    },
    [setCurrentPassword],
  );

  //新しいパスワード
  const newPasswordValue = useCallback(
    (e) => {
      setNewPassword(e.target.value);
    },
    [setNewPassword],
  );

  //確認用パスワード
  const passwordConfValue = useCallback(
    (e) => {
      setPasswordConf(e.target.value);
    },
    [setPasswordConf],
  );

  //ルーターリンク
  const router = useRouter();
  //ログインID
  const loginId = useContext(loginIdContext);
  /**
   * 登録ボタンを押した時に呼ばれる
   */
  const onSubmit = useCallback(() => {
    //エラーの初期化
    setCurrentPasswordError("");
    setNewPasswordErrorMessage("");
    setPasswordConfErrorMessage("");
    //エラーチェック
    if (newPassword === password) {
      setNewPasswordErrorMessage("現在のパスワードと同じです");
    }
    if (currentPassword != password) {
      setCurrentPasswordError(
        "現在のパスワードが登録しているものと一致しません",
      );
    }
    if (passwordConf != newPassword) {
      setPasswordConfErrorMessage("新しいパスワードと一致しません");
    }
    if (
      !(
        /[A-Z]+/.test(newPassword) &&
        /[a-z]+/.test(newPassword) &&
        /[0-9]+/.test(newPassword)
      )
    ) {
      setNewPasswordErrorMessage(
        "パスワードは大文字/小文字/数字を組み合わせて下さい。",
      );
    }
    if (newPassword.length < 8 || newPassword.length > 16) {
      setNewPasswordErrorMessage(
        "パスワードは８文字以上１６文字以内で設定してください",
      );
    }
    if (newPassword === "") {
      setNewPasswordErrorMessage("新しいパスワードを入力して下さい");
    }

    //更新完了でユーザ画面に戻る
    router.push(`/user/${loginId}`);
    //[]内入れないと変更が反映されないため、入力
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPassword, newPassword, password, passwordConf]);

  /**
   * キャンセルボタンを押した時に呼ばれる
   */
  const cancel = () => {
    router.push(`/user/${loginId}`);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => null}
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
                  パスワード変更
                </Dialog.Title>
                <form>
                  <div className="mt-2">
                    <div className="text-red-500">
                      {currentPasswordErrorMessage}
                    </div>
                    <TextInput
                      label="現在のパスワード(半角英数字)"
                      type="password"
                      fullWidth={true}
                      required
                      placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                      onChange={currentPasswordValue}
                      value={currentPassword}
                    />
                  </div>
                  <div className="mt-2">
                    <div className="text-red-500">
                      {newPasswordErrorMessage}
                    </div>
                    <TextInput
                      label="新しいパスワード(半角英数字)"
                      type="password"
                      fullWidth={true}
                      required
                      placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                      onChange={newPasswordValue}
                      value={newPassword}
                    />
                  </div>
                  <div className="mt-2">
                    <div className="text-red-500">
                      {passwordConfErrorMessage}
                    </div>
                    <TextInput
                      label="確認用パスワード(半角英数字)"
                      type="password"
                      fullWidth={true}
                      required
                      placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                      onChange={passwordConfValue}
                      value={passwordConf}
                    />
                  </div>
                  {/* ボタン */}
                  <div className="mt-4 flex gap-5 justify-center">
                    <Button
                      label="登録"
                      backgroundColor="#f28728"
                      color="white"
                      size="md"
                      onClick={onSubmit}
                      type="button"
                    />
                    <Button
                      label="キャンセル"
                      backgroundColor="#f6f0ea"
                      color="#f28728"
                      size="md"
                      onClick={cancel}
                    />
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});
