import { NextPage } from "next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../components/Form/TextInput";
import { Button } from "../../../components/Button/Button";
import { useRouter } from "next/router";
import { JAVA_API_URL } from "../../../utils/const";
import useSWR from "swr";
import { UpdatePassInfo } from "../../../types/type";
import axios from "axios";

//バリデーションチェック
const schema = yup.object().shape({
  //メールアドレスのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .email("メールアドレス形式で入力してください")
    .max(255, "メールアドレスは255文字以内で入力してください"),
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
 * パスワードを忘れたときの画面
 * @returns パスワードを忘れたときの画面
 */
const UpdatePass: NextPage = () => {
  //ルーターリンク
  const router = useRouter();
  //URLの後ろからtoken取得
  const passToken = String(router.query.token);
  console.log(passToken);

  //バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  /**
   * APIで初期表示用データ取得.
   */
  const { data: payload, error } = useSWR(`${JAVA_API_URL}/mail/${passToken}`);
  const updatePassData = payload?.mail;

  if (!error && !updatePassData) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>データを取得できませんでした</div>;
  }
  const updatePassTokenData: UpdatePassInfo = updatePassData;

  //送信ボタンを押したときに呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);

    try {
      //APIに変更するユーザーのアドレスと新しいパスを送信する
      const res = await axios.patch(`${JAVA_API_URL}/password/${passToken}`, {
        email: data.email,
        password: data.password,
      });
      //パス変更に成功した場合
      if (res.data.status === "success") {
        //パスワード変更完了したら画面遷移
        router.push("/auth/compupdatepass");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 ">
          以下のフォームよりパスワードの更新をお願いします
        </div>
        {updatePassData && (
        <div className="flex flex-col items-center mt-5">
            <div className="mt-3">
              メールアドレス:{updatePassTokenData.email}
            </div>
          <div className="w-3/4 sm:w-2/4 mt-3">
            {/* パスワードのテキストフォーム */}
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
          <div className="w-3/4 sm:w-2/4 mt-3">
            {/* 確認用パスワードのテキストフォーム */}
            <TextInput
              label="確認用パスワード"
              type="password"
              fullWidth={true}
              required
              errorMessage={errors.passwordConf?.message}
              placeholder="8文字以上16文字以内"
              registers={register("passwordConf")}
            />
          </div>
          <div className="mt-10 mb-10">
            <Button
              label="変更"
              backgroundColor="#f28728"
              color="white"
              size="md"
              onClick={handleSubmit(onSubmit)}
            />
          </div>{" "}
          </div>
        )}
      </div>
    </>
  );
};
export default UpdatePass;
