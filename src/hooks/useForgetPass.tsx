import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { JAVA_API_URL } from "../utils/const";

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
 * パスワード忘れた場合のメール送信のカスタムフック.
 * @returns
 *  - register:入力したデータ
 *  - handleSubmit:データを入力した際のリアルタイム更新
 *  - errors:エラー
 *  - onSubmit:送信ボタンを押した時のメソッド
 *  - closeModal:モーダルを閉じるメソッド
 *  - doOnButton:入力内容をクリアしてモーダルを閉じるメソッド
 *  - isOpen:モーダルのオープン状態
 */
export const useForgetPass = () => {
  // モーダルのオープン状態
  const [isOpen, setIsOpen] = useState(false);

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
        setIsOpen(true);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  //モーダルを閉じるメソッド.
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * 入力内容をクリアしてモーダルを閉じる.
   */
  const doOnButton = () => {
    //入力値をクリア
    clear();
    setIsOpen(false);
  };

  /**
   * 入力データをクリア.
   */
  const clear = () => {
    reset({
      email: "",
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    closeModal,
    doOnButton,
    isOpen,
  };
};
