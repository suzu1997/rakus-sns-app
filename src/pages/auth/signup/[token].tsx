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

  //URLの後ろからtoken取得
  const userToken = String(router.query.token);

  /**
   * APIで初期表示用データ取得.
   */
  const { data: payload, error } = useSWR(`${JAVA_API_URL}/mail/${userToken}`);
  const userPreData = payload?.mail;

  if (!error && !userPreData) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>データを取得できませんでした</div>;
  }
  const userPreTokenData: UserPreInfo = userPreData;

  //登録ボタンを押した時に呼ばれる
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    //フォーマットを変換
    const hireDate = String(format(data.hireDate, "yyyy-MM-dd"));
    const birthDay = String(format(data.birthDay, "yyyy-MM-dd"));

    //仮登録情報の名前とアドレスをこれでAPI送信できるのか??
    const preName = userPreTokenData.name;
    const preEmail = userPreTokenData.email;

    //APIに送るデータ
    const postDate = {
      name: preName,
      accountName: data.accountName,
      email: preEmail,
      hireDate: hireDate,
      birthDay: birthDay,
      serviceFk: data.serviceFk,
      password: data.password,
    };
    
    try {
      //APIにユーザー登録情報を送信する
      const res = await axios.post(`${JAVA_API_URL}/signup`, postDate);
      //本登録に成功した場合
      if (res.data.status === "success") {
        console.dir(JSON.stringify(postDate));
        //会員登録に成功したら登録完了画面に遷移する;
        router.push("/auth/signup/compsignup");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //クリアボタン
  const clear = () => {
    reset({
      accountName: "",
      hireDate: "",
      birthDay: "",
      password: "",
      passwordConf: "",
    });
  };

  return (
    <div>
      <div className="border-solid  border-2 lg:m-10 sm:m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          本登録フォーム
        </div>
        {userPreData && (
          <div className="flex flex-col items-center mt-10 mr-3 ml-3">
            {/* トークンから名前とアドレス情報を取得 */}
            <div className="text-xl mt-3">名前:{userPreTokenData.name}</div>
            <div className="mt-3">メールアドレス:{userPreTokenData.email}</div>
            <div className="w-3/4 mt-3">
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
            <div className="w-3/4 mt-3">
              {/* 入社年のテキストフォーム*/}
              <TextInput
                label="入社月"
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
              <Radio
                id="FR"
                value="1"
                name="serviceFk"
                registers={register("serviceFk")}
                defaultChecked
              />
              <Radio
                id="Java"
                value="2"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="CL"
                value="3"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="QA"
                value="4"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="ML"
                value="5"
                name="serviceFk"
                registers={register("serviceFk")}
              />
              <Radio
                id="内勤"
                value="6"
                name="serviceFk"
                registers={register("serviceFk")}
              />
            </div>
            <div className="w-3/4 mt-3">
              {/* 誕生日のテキストフォーム */}
              <TextInput
                label="誕生日"
                type="date"
                fullWidth={true}
                required
                errorMessage={errors.birthDay?.message}
                registers={register("birthDay")}
              />
            </div>
            <div className="w-3/4 mt-3">
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
            <div className="w-3/4 mt-3">
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
                onClick={clear}
              />
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
export default SignUp;
