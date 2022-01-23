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
import { useCallback, useContext, useEffect, useState } from "react";
import { loginIdContext } from "../../providers/LoginIdProvider";
import axios from "axios";
import { format } from "date-fns";
import { JAVA_API_URL } from "../../utils/const";
import useSWR from "swr";
import toast from "react-hot-toast";

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
  serviceFk: yup.string(),
  //プロフィールのバリデーション
  introduction: yup
    .string()
    .max(140, "自己紹介は140文字以内で入力してください"),
});

/**
 * ユーザー情報編集画面
 * @returns ユーザー情報を編集するためのページ
 */
const Edit: NextPage = () => {
  //ログインID
  const loginId = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();

  /**
   * APIで初期表示用データ取得.
   */
  const { data: payload } = useSWR(`${JAVA_API_URL}/user/${loginId}`);
  const [userData, setUserData] = useState(payload?.user);

  // 年月だけ取得したい初期値は、日付を削る必要があるため
  const defaultHireDate = userData?.hireDate;
  const formatHireDate = defaultHireDate?.slice(0, 7);

  //名前を姓名に分ける
  const fullName = userData?.name;
  const nameArray = fullName?.split(" ");
  const formatFirstName = nameArray?.[0];
  const formatLastName = nameArray?.[1];

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //初期値はログインしている人のデータを入れる
    defaultValues: {
      firstName: formatFirstName,
      lastName: formatLastName,
      accountName: userData?.accountName,
      hireDate: formatHireDate,
      birthDay: userData?.birthDay,
      serviceFk: userData?.serviceFk,
      introduction: userData?.introduction,
    },
  });

  /**
   * ユーザ情報読み込み直し.
   */
  const getReData = useCallback(async () => {
    try {
      const res = await axios.get(`${JAVA_API_URL}/user/${loginId}`);
      setUserData(res.data.user);
    } catch (error) {
      console.log(error);
    }
  }, [loginId]);

  /**
   * リロード問題解消用.
   */
  useEffect(() => {
    getReData();
  }, [getReData]);

  /**
   * 登録ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    //名前：姓＋名
    const name = data.firstName + " " + data.lastName;
    //入社月のフォーマット変更
    const hireDate = String(format(data.hireDate, "yyyy-MM-dd"));
    //誕生日のフォーマット変更
    const birthDay = String(format(data.birthDay, "yyyy-MM-dd"));

    //APIに送るデータ
    const postData = {
      id: loginId, //ログインユーザID
      accountName: data.accountName, //アカウント名
      name: name, //名前
      hireDate: hireDate, //入社月
      serviceFk: data.serviceFk, //職種
      birthDay: birthDay, //誕生日
      introduction: data.introduction, //自己紹介
    };

    console.dir("送るデータ" + JSON.stringify(postData));

    try {
      const res = await axios.patch(
        `${JAVA_API_URL}/user/edit/${loginId}`,
        postData,
      );
      if (res.data.status === "success") {
        toast.success("更新しました");
        //更新完了でユーザ情報画面に戻る
        router.push(`/user/${loginId}`);
      } else {
        toast.error("エラー" + res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //パスワード用モーダル開閉
  const [openModal, serOpenModal] = useState(false);

  /**
   * パスワード変更モーダルを開けるメソッド.
   */
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
    <>
      <div>
        <PasswordModal isOpen={openModal} />
        <div className="text-center bg-bgc border-solid  border-2 border-bgc-200 m-10 shadow-lg rounded-md">
          <div className="flex flex-col items-center">
            <div className="mt-3 text-3xl font-extrabold">ユーザー情報編集</div>
            <div>
              {userData ? (
                <Image
                  src={`/image/userIcon/${userData.userPhotoPath}`}
                  width={200}
                  height={200}
                  alt="icon"
                ></Image>
              ) : (
                <div className="flex justify-center pt-10 w-full">
                  <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
                </div>
              )}
            </div>
            <div
              onClick={openPasswordModal}
              className="text-text-brown my-5 cursor-pointer hover:text-basic"
            >
              パスワード変更はこちら
            </div>
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
                  registers={register("introduction")}
                />
                <div className="text-red-500">
                  {errors.introduction?.message}
                </div>
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
          </div>
        </div>
      </div>
      )
    </>
  );
};
export default Edit;
