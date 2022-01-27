import { NextPage } from "next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { ConfModal } from "../../components//Modal/ConfModal";
import { JAVA_API_URL } from "../../utils/const";
import axios from "axios";
import { useModal } from "../../hooks/useModal";

//バリデーションチェック
const schema = yup.object().shape({
  //メールアドレスのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .email("メールアドレス形式で入力してください")
    .max(255, "メールアドレスは255文字以内で入力してください"),
});

/**
 * パスワードを忘れたときの画面.
 * @returns パスワードを忘れたときの画面
 */
const ForgetPass: NextPage = () => {
  // モーダル開閉用カスタムフック呼び出し
  const { modalStatus, setModalStatus, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    //バリデーション機能を呼び出し
    resolver: yupResolver(schema),
  });

  /**
   * 送信ボタンを押した時のメソッド.
   * @param data 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    //APIに送るデータ
    const postDate = {
      email: data.email,
    };
    try {
      const res = await axios.post(
        `${JAVA_API_URL}/password/sendMail`,
        postDate,
      );
      //メール認証に成功した場合
      if (res.data.status === "success") {
        //メール認証成功したらモーダルを開ける
        setModalStatus(true);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  //入力内容をクリアしてモーダルを閉じる
  const doOnButton = () => {
    //入力値をクリア
    clear();
    setModalStatus(false);
  };

  //入力データをクリア
  const clear = () => {
    reset({
      email: "",
    });
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 text-base  sm:text-xl">
          ご登録いただいているメールアドレスをご入力してください
        </div>
        <form name="SignupForm" noValidate>
          <div className="flex flex-col items-center mt-5">
            <div className="gap-3 w-3/4 mt-3">
              {/* メールアドレスのテキストフォーム */}
              <TextInput
                label="メールアドレス"
                type="text"
                fullWidth={true}
                required
                errorMessage={errors.email?.message}
                placeholder="メールアドレス"
                registers={register("email")}
              />
            </div>
            <div className="mt-10 mb-10">
              <Button
                label="送信"
                backgroundColor="#f28728"
                color="white"
                size="md"
                onClick={handleSubmit(onSubmit)}
              />
            </div>{" "}
          </div>{" "}
          <ConfModal
            isOpen={modalStatus}
            closeModal={closeModal}
            title="ご入力いただいたメールアドレス宛にメールを送信しました"
            message="送信したメールアドレスよりパスワード変更手続きをお願い致します"
            button="了解"
            doOnButton={doOnButton}
          />
        </form>
      </div>
    </>
  );
};
export default ForgetPass;
