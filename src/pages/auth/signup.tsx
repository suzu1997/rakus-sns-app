import { useState } from "react";
import { Button } from "../../components/Button";
import { SelectBox } from "../../components/Form/SelectBox";
import { Radio } from "../../components/Form/Radio";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../components/Form/TextInput";

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
    .matches(/^[0-9a-zA-Z]+$/, "半角英数字で入力してください")
    .max(200, "メールアドレスは200文字以内で入力してください"),
  //アカウント名のバリデーション
  accountName: yup
    .string()
    .required("アカウント名を入力してください")
    .max(30, "アカウント名は30文字以内で入力してください"),
  //入社年のバリデーション
  hireDate: yup.string().required("入社年を入力してください"),
  //誕生日のバリデーション
  birthDate: yup.string().required("誕生日を入力してください"),
  //職種のバリデーション
  service: yup.string().required("職種を選択してください"),
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
    .oneOf([yup.ref("password"), null], "確認用パスワードが一致していません"),
});

/**
 * ユーザー登録画面
 * @returns ユーザー登録するためのページ
 */
const SignUp: NextPage = () => {
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

  //ルーターリンク
  const router = useRouter();

  //セレクトボックスの初期値
  const [selectValue, setSelectValue] = useState<string>(options[0].name);

  //登録ボタンを押した時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    //会員登録に成功したら登録完了画面に遷移する
    router.push("/auth/compsignup");
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          本登録フォーム
        </div>
        <form name="SignupForm" noValidate>
          <div className="flex flex-col items-center mt-10">
            <div className="flex w-96 gap-3 mt-3">
              {/* 姓のテキストフォーム */}
              <TextInput
                label="姓"
                type="text"
                fullWidth={false}
                required
                errorMessage={errors.firstName?.message}
                placeholder="姓"
                registers={register("firstName")}
              />
              {/* registers={register} でバリデーション機能に登録される */}
              {/* errors はバリデーションエラー内容を持つ構造体で自動で更新される */}

              {/* 名のテキストフォーム */}
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
              <div className="mt-2 text-left">
                <SelectBox
                  label="ドメイン"
                  value={selectValue}
                  select={setSelectValue}
                  options={options}
                />
              </div>
            </div>
            <div className="w-96 mt-3">
              {/* アカウント名のテキストフォーム */}
              <TextInput
                label="アカウント名"
                type="text"
                fullWidth={true}
                required
                errorMessage={errors.accountName?.message}
                placeholder="アカウント名"
                registers={register("accountName")}
              />
            </div>
            <div className="w-96 mt-3">
              {/* 入社年のテキストフォーム*/}
              <TextInput
                label="入社年"
                type="month"
                fullWidth={true}
                required
                errorMessage={errors.hireDate?.message}
                registers={register("hireDate")}
              />
            </div>
            {/* 職種のラジオボタン */}
            <div className="mt-3">職種を選択してください</div>
            <div className="flex gap-5">
              <Radio id="FR" value="1" name="jobType" defaultChecked />
              <Radio id="Java" value="2" name="jobType" />
              <Radio id="CL" value="3" name="jobType" />
              <Radio id="QA" value="4" name="jobType" />
              <Radio id="ML" value="5" name="jobType" />
              <Radio id="内勤" value="6" name="jobType" />
            </div>
            <div className="w-96 mt-3">
              {/* 誕生日のテキストフォーム */}
              <TextInput
                label="誕生日"
                type="date"
                fullWidth={true}
                required
                errorMessage={errors.birthDate?.message}
                registers={register("birthDate")}
              />
            </div>
            <div className="w-96 mt-3">
              {/* パスワードのテキストフォーム */}
              <TextInput
                label="パスワード(半角英数字)"
                type="password"
                fullWidth={true}
                required
                errorMessage={errors.password?.message}
                placeholder="8文字以上16文字以内(大文字小文字数字含む)"
                registers={register("password")}
              />
            </div>
            <div className="w-96 mt-3">
              {/* 確認用パスワードのテキストフォーム */}
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
            <div className="flex gap-3 mt-10 mb-10">
              <Button
                label="登録"
                backgroundColor="#f28728"
                color="white"
                size="md"
                onClick={handleSubmit(onSubmit)}
              />
              <Button
                label="クリア"
                backgroundColor="#f6f0ea"
                color="#f28728"
                size="md"
                onClick={reset}
              />
            </div>{" "}
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
