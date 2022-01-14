import { useState } from "react";
import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import { SelectBox } from "../../components/Form/SelectBox";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

//バリデーションチェック
const schema = yup.object().shape({
  //姓のバリデーション
  firstName: yup
    .string()
    .required("姓名を入力してください")
    .max(15, "姓名は15文字以内で入力してください"),
  //名のバリデーション
  lastName: yup
    .string()
    .required("名前を入力してください")
    .max(15, "名前は15文字以内で入力してください"),
  //メールのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .max(200, "メールアドレスは200文字以内で入力してください"),
});

/**
 * ユーザー仮登録画面
 * @returns 仮登録するためのページ
 */
const PreSignUp: NextPage = () => {
  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //メールアドレスのドメイン選択肢
  const options = [
    { id: "1", name: "@rakus-patners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];

  //セレクトボックスの初期値
  const [selectValue, setSelectValue] = useState<string>(options[0].name);

  //ルーターリンク
  const router = useRouter();

  //登録ボタンを押した時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    //本来はAPIにデータを送る
    //仮登録が完了ならば、入力内容をクリアした後、仮登録完了画面に遷移する
    reset;
    router.push("/auth/comppresignup");
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          仮登録フォーム
        </div>

        <div className="flex flex-col items-center mt-10">
          <div className="flex w-96 gap-3 mt-3">
            <TextInput
              label="姓"
              type="text"
              fullWidth={false}
              required
              errorMessage={errors.firstName?.message}
              placeholder="姓"
              registers={register("firstName")}
            />
            <TextInput
              label="名"
              type="text"
              fullWidth={false}
              required
              errorMessage={errors.lastName?.message}
              placeholder="名"
              registers={register("lastName")}
            />
          </div>
          <div className="flex gap-3 w-96 mt-3">
            <TextInput
              label="メールアドレス"
              type="text"
              fullWidth={false}
              required
              errorMessage={errors.email?.message}
              placeholder="メールアドレス"
              registers={register("email")}
            />
            <div className="mt-2">
              <SelectBox
                label="ドメイン"
                value={selectValue}
                select={setSelectValue}
                options={options}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-10 mb-10">
            <Button
              label="仮登録"
              backgroundColor="#f28728"
              color="white"
              size="md"
              onClick={handleSubmit(onSubmit)}
            />
          </div>{" "}
        </div>
      </div>
    </>
  );
};
export default PreSignUp;
