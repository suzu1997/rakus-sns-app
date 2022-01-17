import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Cookie from "universal-cookie";
import Link from "next/link";

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
 * ログインページ
 * @returns ログインするためのページ
 */
const Login: NextPage = () => {
  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();

  //クッキーに登録
  const cookie = new Cookie();

  //ログインボタンを押した時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    //ログインに成功したらクッキーにログイン情報をセットし、タイムラインページに画面遷移
    cookie.set("user", data.email, { path: "/" });
    console.log("ログイン成功" + cookie.get("user"));
    reset;
    router.push("/timeline");
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
      <Link href="/auth/forgetpass">
        <a className="underline hover:text-blue-800 mt-3">
          パスワードを忘れた方はコチラ
        </a>
      </Link>
    </div>
  );
};
export default Login;
