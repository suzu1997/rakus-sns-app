import { useCallback, useState } from "react";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { SelectBox } from "../../components/SelectBox";
import { NextPage } from "next";
import { useRouter } from "next/router";

/**
 * ユーザー仮登録画面
 * @returns 仮登録するためのページ
 */
const PreSignUp: NextPage = () => {
  //メールアドレスのドメイン選択肢
  const options = [
    { id: "1", name: "@rakus-patners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];

  //入力フォームの初期値
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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

  //ルーターリンク
  const router = useRouter();

  //登録ボタンを押した時に呼ばれる
  const submitForm = () => {
    //バリデーションチェック後で実装、全てtrueならば以下に進む

    //本来はAPIにデータを送る
    //仮登録が完了ならば、入力内容をクリアした後、仮登録完了画面に遷移する
    setFirstName("");
    setLastName("");
    setEmail("");
    router.push("/auth/comppresignup");
  };
  //クリアボタンを押した時に呼ばれる
  const formClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          仮登録フォーム
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
          <div className="flex gap-3 mt-10 mb-10">
            <Button
              label="仮登録"
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
export default PreSignUp;
