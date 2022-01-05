import { NextPage } from "next";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import Router from "next/router";

/**
 * ユーザー情報編集画面
 * @returns ユーザー情報を編集するためのページ
 */
const Edit: NextPage = () => {
  //テストデータ
  const [data] = useState({
    name: "やまちゃん",
    hireDate: "2021年10月",
    img: "/usakus.jpg",
    jobtype: "FR",
    birthDay: "",
    profile: "",
  });

  //入力フォームの初期値
  const [nameValue, setNameValue] = useState<string>(data.name);
  const [birthDayValue, setBirthDayValue] = useState<string>(data.birthDay);
  const [profileValue, setProfileValue] = useState<string>(data.profile);

  //各入力フォームに入力した際に更新される
  const inputNameValue = useCallback(
    (e) => {
      setNameValue(e.target.value);
    },
    [setNameValue],
  );
  const inputBirthDayValue = useCallback(
    (e) => {
      setBirthDayValue(e.target.value);
    },
    [setBirthDayValue],
  );
  const inputProfileValue = useCallback(
    (e) => {
      setProfileValue(e.target.value);
    },
    [setProfileValue],
  );

  //更新ボタンを押した時に呼ばれる
  const updateUserInfo = () => {
    //本来はデータを更新
    Router.push("/user");
  };

  //キャンセルボタンを押した時に呼ばれる
  const cancel = () => {
    Router.push("/user");
  };

  return (
    <div>
      <div className="text-center bg-bgc border-solid  border-2 border-bgc-200 m-10 shadow-lg rounded-md">
        <div className="flex flex-col items-center">
          <div className="mt-3 text-3xl font-extrabold">ユーザー情報編集</div>
          <div>
            <Image src={data.img} width={200} height={200} alt="icon"></Image>
          </div>
          <div>
            <TextInput
              label="アカウント名"
              value={nameValue}
              type="text"
              fullWidth={false}
              required={false}
              onChange={inputNameValue}
            />

            <TextInput
              label="誕生日"
              value={birthDayValue}
              type="Date"
              fullWidth={false}
              required={false}
              onChange={inputBirthDayValue}
            />

            <TextInput
              label="自己紹介"
              value={profileValue}
              type="text"
              fullWidth={false}
              required={false}
              onChange={inputProfileValue}
            />
          </div>
          <div className="flex gap-3 mt-10 mb-10">
            <Button
              label="更新"
              backgroundColor="#f28728"
              color="white"
              size="md"
              onClick={updateUserInfo}
            />
            <Button
              label="キャンセル"
              backgroundColor="white"
              color="#f28728"
              size="md"
              onClick={cancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
