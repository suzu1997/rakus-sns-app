import { NextPage } from "next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { useState, useCallback } from "react";

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
 * パスワードを忘れたときの画面
 * @returns パスワードを忘れたときの画面
 */
const ForgetPass: NextPage = () => {

  //バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //送信ボタンを押したときに呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 ">
          ご登録いただいているメールアドレスをご入力してください
        </div>
        <form name="SignupForm" noValidate>
          <div className="flex flex-col items-center mt-5">
            <div className="gap-3 w-96 mt-3">
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
        </form>
      </div>
    </>
  );
};
export default ForgetPass;
