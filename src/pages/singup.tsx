import { useCallback, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { SelectBox } from "../components/SelectBox";
import { Radio } from "../components/Radio";
import { NextPage } from "next";
import { useRouter } from "next/router";

/**
 * ユーザー登録画面
 * @returns ユーザー登録するためのページ
 */
const SingUp: NextPage = () => {
  //メールアドレスのドメイン選択肢
  const options = [
    { id: "1", name: "@rakus-patners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];

  //ルーターリンク
  const router = useRouter();

  //入力フォームの初期値
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");
  const [hireDate, setHireDate] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  //セレクトボックスの初期値
  const [selectValue, setSelectValue] = useState<string>(options[0].name);

  //各入力フォームに入力した際に更新される
  const inputFirstNameValue = useCallback((e) => {
    setFirstName(e.target.value);
  }, []);
  const inputLastNameValue = useCallback((e) => {
    setLastName(e.target.value);
  }, []);
  const inputEmailValue = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const inputAccountNameValue = useCallback((e) => {
    setAccountName(e.target.value);
  }, []);
  const inputHireDateValue = useCallback((e) => {
    setHireDate(e.target.value);
  }, []);
  const inputBirthDateValue = useCallback((e) => {
    setBirthDate(e.target.value);
  }, []);
  const inputPasswordValue = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const inputPasswordConfValue = useCallback((e) => {
    setPasswordConf(e.target.value);
  }, []);

  //登録ボタンを押した時に呼ばれる
  const submitForm = () => {
    //バリデーションチェック後で実装、全てtrueならば以下に進む

    //本来はAPIを使用してデータを送信
    //登録が成功したら登録完了画面に遷移する
    router.push("/compsingup");
  };
  //クリアボタンを押した時に呼ばれる
  const formClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordConf("");
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          本登録フォーム
        </div>
        <div className="flex flex-col items-center mt-10">
          <div className="flex w-96 gap-3 mt-3">
            <TextInput
              label="姓"
              value={firstName}
              type="text"
              fullWidth={false}
              required
              onChange={inputFirstNameValue}
            />
            <TextInput
              label="名"
              value={lastName}
              type="text"
              fullWidth={false}
              required
              onChange={inputLastNameValue}
            />
          </div>
          <div className="flex gap-3 w-96 mt-3">
            <TextInput
              label="メールアドレス"
              value={email}
              type="text"
              fullWidth={false}
              required
              onChange={inputEmailValue}
            />
            <div className="mt-2">
              <SelectBox
                label="ドメイン"
                value={selectValue}
                select={setSelectValue}
                options={options}
              />
            </div>
          </div>
          <div className="w-96 mt-3">
            <TextInput
              label="アカウント名"
              value={accountName}
              type="text"
              fullWidth={true}
              required
              onChange={inputAccountNameValue}
            />
          </div>
          <div className="w-96 mt-3">
            <TextInput
              label="入社年"
              value={hireDate}
              type="month"
              fullWidth={true}
              required
              onChange={inputHireDateValue}
            />
          </div>
          <div className="mt-3">職種を選択してください</div>
          <div className="flex gap-5">
            <Radio id="FR" value="1" />
            <Radio id="Java" value="2" />
            <Radio id="CL" value="3" />
            <Radio id="QA" value="4" />
            <Radio id="ML" value="5" />
            <Radio id="内勤" value="6" />
          </div>
          <div className="w-96 mt-3">
            <TextInput
              label="誕生日"
              value={birthDate}
              type="date"
              fullWidth={true}
              required
              onChange={inputBirthDateValue}
            />
          </div>
          <div className="w-96 mt-3">
            <TextInput
              label="パスワード"
              value={password}
              type="password"
              fullWidth={true}
              required
              onChange={inputPasswordValue}
            />
          </div>
          <div className="w-96 mt-3">
            <TextInput
              label="確認用パスワード"
              value={passwordConf}
              type="password"
              fullWidth={true}
              required
              onChange={inputPasswordConfValue}
            />
          </div>
          <div className="flex gap-3 mt-10 mb-10">
            <Button
              label="登録"
              backgroundColor="#f28728"
              color="white"
              size="md"
              onClick={submitForm}
            />
            <Button
              label="クリア"
              backgroundColor="#f6f0ea"
              color="#f28728"
              size="md"
              onClick={formClear}
            />
          </div>{" "}
        </div>
      </div>
    </>
  );
};
export default SingUp;
