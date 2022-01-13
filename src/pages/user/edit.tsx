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
  hireDate: yup.string().required("入社年を入力してください"),
  //誕生日のバリデーション
  birthDate: yup.string().required("誕生日を入力してください"),
  //職種のバリデーション
  service: yup.string().required("職種を選択してください"),
  profile: yup.string().max(140, "自己紹介は140文字以内で入力してください"),
});

/**
 * ユーザー情報編集画面
 * @returns ユーザー情報を編集するためのページ
 */
const Edit: NextPage = () => {
  //テストデータ
  // const [data] = useState({
  //   name: "やまちゃん",
  //   hireDate: "2021年10月",
  //   img: "/usakus.jpg",
  //   jobtype: "FR",
  //   birthDay: "",
  //   profile: "",
  // });

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    //初期値はログインしている人のデータを入れる
    defaultValues: {
      firstName: "やま",
      lastName: "ちゃん",
      accountName: "やまちゃん",
      hireDate: "2022-10",
      birthDate: "2022-01-01",
      service: "FR",
      profile: "とても元気です",
    },
  });

  //ルーターリンク
  const router = useRouter();
  /**
   * 登録ボタンを押した時に呼ばれる
   * @param data - 入力したデータ
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("発動");
    console.log(data);
    //更新完了でユーザ画面に戻る
    router.push("/user/1");
  };

  /**
   * キャンセルボタンを押した時に呼ばれる
   */
  const cancel = () => {
    router.push("/user/1");
  };

  return (
    <div>
      <PasswordModal isOpen={true} closeModal={() => console.log("")} />
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
                {/* 入社年のテキストフォーム*/}
                <TextInput
                  label="入社年"
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
                  registers={register("birthDate")}
                />
                <div className="text-red-500">{errors.birthDate?.message}</div>
              </div>
              {/* 自己紹介のテキストフォーム */}
              <TextArea
                label="プロフィール"
                rows={6}
                cols={30}
                registers={register("profile")}
              />
              <div className="text-red-500">{errors.profile?.message}</div>

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
          パスワード変更はこちら
        </div>
      </div>
    </div>
  );
};
export default Edit;
