import { TextInput } from "../../components/Form/TextInput";
import { useState, useCallback } from "react";
import { Button } from "../../components/Button/Button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

//バリデーションチェック
const schema = yup.object().shape({
  //メールのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .email("メールアドレス形式で入力してください")
    .max(200, "メールアドレスは200文字以内で入力してください"),
  //パスワードのバリデーション
  password: yup
    .string()
    .required("パスワードを入力してください")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
      "アルファベット（大文字小文字混在）と数字とを組み合わせて入力してください",
    )
    .max(16, "16文字以内で入力してください")
    .min(8, "8文字以上で入力してください"),
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

  const inputEmailValue = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );
  const inputPasswordValue = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );

  //ログインボタンを押した時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    console.log("ログイン成功" + cookie.get("user"));
    reset;
    router.push("/timeline");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-96 mt-3">
        <TextInput
          label="メールアドレス"
          value={email}
          type="text"
          fullWidth={true}
          required
          errorMessage={errors.email?.message}
          placeholder="メールアドレス"
          registers={register("email")}
        />
      </div>
      <div className="w-96 mt-3">
        <TextInput
          label="パスワード"
          value={password}
          type="password"
          fullWidth={true}
          required
          errorMessage={errors.password?.message}
          placeholder="8文字以上16文字以内(大文字小文字数字含む)"
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
    </div>
  );
};
export default Login;
