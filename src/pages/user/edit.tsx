import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { TextInput } from "../../components/Form/TextInput";
import { Button } from "../../components/Button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Radio } from "../../components/Form/Radio";
import { useForm } from "react-hook-form";
import { TextArea } from "../../components/Form/TextArea";
import { PasswordModal } from "../../components/Modal/PasswordModal";
import { useContext, useState } from "react";
import { loginIdContext } from "../../providers/LoginIdProvider";
import axios from "axios";
import { format } from "date-fns";

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
  //アカウント名のバリデーション
  accountName: yup
    .string()
    .required("アカウント名を入力してください")
    .max(30, "アカウント名は30文字以内で入力してください"),
  //入社年のバリデーション
  hireDate: yup.date().max(new Date(), "入社日は現在よりも前に設定して下さい"),
  //誕生日のバリデーション
  birthDay: yup.date().max(new Date(), "誕生日は現在よりも前に設定して下さい"),
  //職種のバリデーション
  service: yup.string(),
  //プロフィールのバリデーション
  profile: yup.string().max(140, "自己紹介は140文字以内で入力してください"),
});

/**
 * ユーザー情報編集画面
 * @returns ユーザー情報を編集するためのページ
 */
const Edit: NextPage = () => {
  //ログインID
  const loginId = useContext(loginIdContext);

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //初期値はログインしている人のデータを入れる
    defaultValues: {
      firstName: "山田",
      lastName: "太郎",
      accountName: "やまちゃん",
      hireDate: "2021-10",
      birthDay: "2000-01-01",
      service: "3",
      profile: "とても元気",
    },
  });

  //ルーターリンク
  const router = useRouter();
  /**
   * 登録ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log("日付：" + data.hireDate);

    const name = data.firstName + data.lastName;
    const hireDate = String(format(data.hireDate, "yyyy-MM-dd"));
    const birthDay = String(format(data.birthDay, "yyyy-MM-dd"));

    const postData = {
      name: name,
      accountName: data.accountName,
      //本来はログインユーザのメールアドレス
      email: "useredit-test@rakus-partners.co.jp",
      hireDate: hireDate,
      birthDay: birthDay,
      // serviceFk: data.serviceFk,
      serviceFk: data.service,
      //本来はログインユーザのPW
      password: "aaaAAA1234567890",
      introduction: data.profile,
    };

    console.dir("送るデータ" + JSON.stringify(postData));

    //APIURL
    const url = "http://localhost:8080";

    // try {
    //   const res = await axios.post(url, postData);
    //   if (res.data.status === "success") {
    //     console.log(res.data.status);
    //     alert("更新しました");
    //     //更新完了でユーザ画面に戻る
    //     router.push(`/user/${loginId}`);
    //   } else {
    //     alert(res.data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const [openModal, serOpenModal] = useState(false);
  const openPasswordModal = () => {
    serOpenModal(true);
  };

  /**
   * キャンセルボタンを押した時に呼ばれる
   */
  const cancel = () => {
    router.push(`/user/${loginId}`);
  };

  return (
    <div>
      <PasswordModal isOpen={openModal} />
      <div className="text-center bg-bgc border-solid  border-2 border-bgc-200 m-10 shadow-lg rounded-md">
        <div className="flex flex-col items-center">
          <div className="mt-3 text-3xl font-extrabold">ユーザー情報編集</div>
          <div>
            <Image
              src="/usakus.jpg"
              width={200}
              height={200}
              alt="icon"
            ></Image>
          </div>
          <div
            onClick={openPasswordModal}
            className="text-text-brown my-5 cursor-pointer hover:text-basic"
          >
            パスワード変更はこちら
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
                  placeholder="名"
                  registers={register("lastName")}
                />
              </div>
              <div className="text-red-500">{errors.firstName?.message}</div>
              <div className="text-red-500">{errors.lastName?.message}</div>

              <div className="w-96 mt-3">
                {/* アカウント名のテキストフォーム */}
                <TextInput
                  label="アカウント名"
                  type="text"
                  fullWidth={true}
                  required
                  placeholder="アカウント名"
                  registers={register("accountName")}
                />
                <div className="text-red-500">
                  {errors.accountName?.message}
                </div>
              </div>
              <div className="w-96 mt-3">
                {/* 入社月のテキストフォーム*/}
                <TextInput
                  label="入社月"
                  type="month"
                  fullWidth={true}
                  required
                  registers={register("hireDate")}
                />
                <div className="text-red-500">{errors.hireDate?.message}</div>
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
                  registers={register("birthDay")}
                />
                <div className="text-red-500">{errors.birthDay?.message}</div>
              </div>
              {/* 自己紹介のテキストフォーム */}
              <div className="my-5">
                <TextArea
                  label="プロフィール"
                  rows={6}
                  cols={30}
                  registers={register("profile")}
                />
                <div className="text-red-500">{errors.profile?.message}</div>
              </div>
              <div className="flex gap-3 mt-10 mb-10">
                <Button
                  label="更新"
                  backgroundColor="#f28728"
                  color="white"
                  size="md"
                  onClick={handleSubmit(onSubmit)}
                />

                <Button
                  label="キャンセル"
                  backgroundColor="#f6f0ea"
                  color="#f28728"
                  size="md"
                  onClick={cancel}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Edit;
