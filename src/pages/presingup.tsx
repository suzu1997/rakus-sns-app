import { useCallback, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { SelectBox } from "../components/SelectBox";
import { NextPage } from "next";
import { ConfModal } from "../components/ConfModal";

/**
 * ユーザー仮登録画面
 * @returns 仮登録するためのページ
 */
const PreSingUp: NextPage = () => {
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

  // メール送信確認モーダルのオープン状態
  const [isOpen, setIsOpen] = useState(false);

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

  //登録ボタンを押した時に呼ばれる
  const submitForm = () => {
    //バリデーションチェック後で実装、全てtrueならば以下に進む

    //本来はAPIにデータを送る
    //メール送信が成功ならば、モーダル画面を開く
    setIsOpen(true);
  };
  //クリアボタンを押した時に呼ばれる
  const formClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  //モーダルを閉じるメソッド.
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  //モーダル中のボタンを押したときに呼ばれる
  const doOnButton = useCallback(() => {
    //入力内容をクリアする
    setFirstName("");
    setLastName("");
    setEmail("");
    //モーダルを閉じる
    setIsOpen(false);
  }, []);

  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          仮登録フォーム
        </div>
        <ConfModal
          isOpen={isOpen}
          closeModal={closeModal}
          title="ご登録いただいたメールアドレス宛にメールを送信しました"
          message="送信したメールより本登録をお願いします"
          button="了解"
          doOnButton={doOnButton}
        />
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
export default PreSingUp;
