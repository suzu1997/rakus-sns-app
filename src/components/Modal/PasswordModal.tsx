import { FC, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../Button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "../Form/TextInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean; // モーダルが開いているかどうか
  closeModal: () => void; // モーダルを閉じるメソッド
};

//バリデーションチェック
const schema = yup.object().shape({
  //現在のパスワードのバリデーション
  currentPassword: yup
    .string()
    .required("パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください"),
  //新しいのパスワードのバリデーション
  newPassword: yup
    .string()
    .required("パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください"),
  //確認用パスワードのバリデーション
  passwordConf: yup
    .string()
    .required("確認用パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください")
    .oneOf(
      [yup.ref("newPassword"), null],
      "確認用パスワードが一致していません",
    ),
});
/**
 * パスワード変更のためのモーダルのコンポーネント.
 */
export const PasswordModal: FC<Props> = memo((props) => {
  const { isOpen, closeModal } = props;

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();
  /**
   * 登録ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    //更新完了でユーザ画面に戻る
    router.push("/user/1");
  };

  /**
   * キャンセルボタンを押した時に呼ばれる
   */
  const cancel = () => {
    router.push("/user/1");
  };

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
                  パスワード変更
                </Dialog.Title>
                <div className="mt-2 text-center">
                  <TextInput
                    label="現在のパスワード(半角英数字)"
                    type="password"
                    fullWidth={true}
                    required
                    errorMessage={errors.currentPassword?.message}
                    placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                    registers={register("currentPassword")}
                  />
                </div>
                <div className="mt-2 text-center">
                  <TextInput
                    label="新しいパスワード(半角英数字)"
                    type="password"
                    fullWidth={true}
                    required
                    errorMessage={errors.newPassword?.message}
                    placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                    registers={register("newPassword")}
                  />
                </div>
                <div className="mt-2 text-center">
                  <TextInput
                    label="確認用パスワード(半角英数字)"
                    type="password"
                    fullWidth={true}
                    required
                    errorMessage={errors.passwordConf?.message}
                    placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                    registers={register("passwordConf")}
                  />
                </div>
                {/* ボタン */}
                <div className="mt-4 flex gap-5 justify-center">
                  <Button
                    label="登録"
                    backgroundColor="#f28728"
                    color="white"
                    size="md"
                    onClick={handleSubmit(onSubmit)}
                  />
                  <Button
                    label="キャンセル"
                    backgroundColor="#f6f0ea"
                    color="#f28728"
                    size="md"
                    onClick={cancel}
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
