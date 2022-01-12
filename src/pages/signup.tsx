import { Button } from "../components/Button";
import { SelectBox } from "../components/SelectBox";
import { Radio } from "../components/Radio";
import { NextPage } from "next";
import * as yup from "yup";
//バリデーションチェック
const schema = yup.object().shape({
  //姓のバリデーション
  firstName: yup
    .string()
    .required("姓を入力してください")
    .max(30, "姓は30文字以内で入力してください"),
  //名のバリデーション
  lastName: yup
    .string()
    .required("名を入力してください")
    .max(30, "名は30文字以内で入力してください"),
  //メールのバリデーション
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .matches(/^[0-9a-zA-Z]+$/, "半角英数字に入力してください")
    .max(200, "メールアドレスは200文字以内で入力してください"),
  //アカウント名のバリデーション
  accountName: yup.string().required("アカウント名を入力してください"),
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
  //メールアドレスのドメイン選択肢
  const options = [
    { id: "1", name: "@rakus-patners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];

  //ルーターリンク
  const router = useRouter();

  //セレクトボックスの初期値
  const [selectValue, setSelectValue] = useState<string>(options[0].name);

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          本登録フォーム
        </div>
      </div>
    </>
  );
};
export default SignUp;
