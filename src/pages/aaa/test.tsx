import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SelectBox } from "../../components/SelectBox";
import { TextInput } from "../../components/TextInput";
import Cookie from "universal-cookie";

const Test: NextPage = () => {
  const options = [
    { id: "1", name: "Wade Cooper" },
    { id: "2", name: "Arlene Mccoy" },
    { id: "3", name: "Devon Webb" },
    { id: "4", name: "Tom Cook" },
    { id: "5", name: "Tanya Fox" },
    { id: "6", name: "Hellen Schmidt" },
  ];

  const [value, setValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>(options[0].name);

  const inputValue = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const cookie = new Cookie();
  const loginTest = () => {
    cookie.set("loginFlug", true, { path: "/" });
    console.log("ログインしました：" + cookie.get("loginFlug"));
  };
  const checkTest = () => {
    console.log("ログイン状況：" + cookie.get("loginFlug"));
  };
  const logoutTest = () => {
    cookie.set("loginFlug", false, { path: "/" });
    console.log("ログアウトしました：" + cookie.get("loginFlug"));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <button type="button" onClick={loginTest}>
        ログインテスト
      </button>
      <br />
      <button type="button" onClick={checkTest}>
        ログイン状況
      </button>
      <br />
      <button type="button" onClick={logoutTest}>
        ログアウト
      </button>

      <p className="font-mono text-red-700">テスト</p>
      <Link href="/">
        <a className="underline hover:text-blue-800 mt-3">トップへ戻る</a>
      </Link>
      {/* inputテスト */}
      <div className="w-96 flex gap-3">
        <TextInput
          label={"テスト"}
          value={value}
          type="text"
          fullWidth={false}
          required
          onChange={inputValue}
        />
        <TextInput
          label={"テスト"}
          value={value}
          type="text"
          fullWidth={false}
          required
          onChange={inputValue}
        />
      </div>
      <div className="w-96">
        <TextInput
          label={"テスト"}
          value={value}
          type="text"
          fullWidth={true}
          required
          onChange={inputValue}
        />
        <div className="w-60">
          <SelectBox
            label={"テスト"}
            value={selectValue}
            options={options}
            select={setSelectValue}
          />
        </div>
        <SelectBox
          label={"テスト"}
          value={selectValue}
          options={options}
          select={setSelectValue}
        />
      </div>
    </div>
  );
};

export default Test;
