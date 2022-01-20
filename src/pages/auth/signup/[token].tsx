import { Button } from "../../../components/Button/Button";
import { Radio } from "../../../components/Form/Radio";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../components/Form/TextInput";
import axios from "axios";
import { format } from "date-fns";
import { JAVA_API_URL } from "../../../utils/const";
import { UserPreInfo } from "../../../types/type";
import useSWR from "swr";

//現在の日時取得
const nowDate = new Date();
//バリデーションチェック
const schema = yup.object().shape({
  //アカウント名のバリデーション
  accountName: yup
    .string()
    .required("アカウント名を入力してください")
    .max(30, "アカウント名は30文字以内で入力してください"),
  //入社年のバリデーション
  hireDate: yup
    .date()
    .typeError("入社年を入力してください")
    .max(nowDate, "入社日は現在よりも前に設定して下さい"),
  //誕生日のバリデーション
  birthDay: yup
    .date()
    .typeError("誕生日を入力してください")
    .max(nowDate, "誕生日は現在よりも前に設定して下さい"),
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
  //useFormから使用するメソッド呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // バリデーションを呼び出し
    resolver: yupResolver(schema),
  });

  //ルーターリンク
  const router = useRouter();

  return (
    <div>
      <div className="border-solid  border-2 lg:m-10 sm:m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          本登録フォーム
        </div>
      </div>
    </div>
  );
};
export default SignUp;
