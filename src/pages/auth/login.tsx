import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Cookie from "universal-cookie";
import Link from "next/link";
import axios from "axios";
import { JAVA_API_URL } from "../../utils/const";
import toast from "react-hot-toast";

//バリデーションチェック
const schema = yup.object().shape({
  //メールのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .email("メールアドレス形式で入力してください")
    .max(255, "メールアドレスは255文字以内で入力してください"),
  //パスワードのバリデーション
  password: yup
    .string()
    .required("パスワードを入力してください")
    .max(16, "16文字以内で入力してください"),
});

/**
 * ログインページ.
 * @returns ログインするためのページ
 */
const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // バリデーション機能を呼び出し
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();
  //クッキー
  const cookie = new Cookie();

  /**
   * ログインボタンを押した時のメソッド.
   * @param data 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${JAVA_API_URL}/login`, {
        email: data.email,
        password: data.password,
      });
      //ログインに成功した場合
      if (res.data.status === "success") {
        //ログインに成功したらクッキーにログイン情報をセット
        cookie.set("id", res.data.user.logicalId, { path: "/" });

        //ログインと同時に入力内容をクリア
        clear();
        toast.success("ログインしました");
        //タイムライン画面に遷移する;
        router.push("/timeline");
      } else {
        //ログインに失敗した場合、エラーメッセージアラートを表示
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  //入力データをクリア
  const clear = () => {
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-3/4 sm:w-2/4  mt-3">
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
      <div className="w-3/4 sm:w-2/4 mt-3">
        <TextInput
          label="パスワード"
          type="password"
          fullWidth={true}
          required
          errorMessage={errors.password?.message}
          placeholder="8文字以上16文字以内"
          registers={register("password")}
        />
      </div>
      <div className="flex gap-3 mt-10">
        <Button
          label="ログイン"
          backgroundColor="#f28728"
          color="white"
          size="md"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      <Link href="/auth/presignup">
        <a className="underline hover:text-blue-800 mt-3">
          会員登録はコチラから
        </a>
      </Link>
      <Link href="/auth/forgetpass">
        <a className="underline hover:text-blue-800 mt-3">
          パスワードを忘れた方はコチラ
        </a>
      </Link>
    </div>
  );
};
export default Login;
