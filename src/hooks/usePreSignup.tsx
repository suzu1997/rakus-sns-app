import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { JAVA_API_URL } from "../utils/const";
import { Option } from "../components/Lunch/AddByHotpepper";

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
 * 仮登録画面で使用する機能.
 * @returns
 * - register:入力したデータ
 * - handleSubmit:データを入力した際のリアルタイム更新
 * - errors:エラー
 * - onSubmit:仮登録ボタンを押した時のメソッド
 * - setSelectValue:選択したセレクトボックスの値
 * - selectValue:セレクトボックスの初期値
 * - options:セレクトボックスの選択肢
 */
export const usePreSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // バリデーション機能を呼び出し
    resolver: yupResolver(schema),
  });

  //メールアドレスのドメイン選択肢
  const options = [
    { id: "1", name: "@rakus-partners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];

  //セレクトボックスの初期値
  const [selectValue, setSelectValue] = useState<Option>(options[0]);

  //ルーターリンク
  const router = useRouter();

  /**
   * 登録ボタン押した時のメソッド.
   * @param data 入力データ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    //APIに送るデータ
    const postDate = {
      name: data.firstName + " " + data.lastName,
      email: data.email + selectValue.name,
    };
    try {
      const res = await axios.post(`${JAVA_API_URL}/presignup`, postDate);
      //仮登録に成功した場合
      if (res.data.status === "success") {
        //入力内容をクリアした後、仮登録完了画面に遷移する
        clear();
        router.push("/auth/comppresignup");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  //入力データをクリア
  const clear = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setSelectValue,
    selectValue,
    options,
  };
};