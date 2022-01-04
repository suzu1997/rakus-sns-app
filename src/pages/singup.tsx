import { useCallback, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { SelectBox } from "../components/SelectBox";
import Router from "next/router";

const SingUp = () => {
  const options = [
    { id: "1", name: "@rakus-patners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [eMail, setEMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [selectValue, setSelectValue] = useState<string>(options[0].name);

  const inputFirstNameValue = useCallback((e) => {
    setFirstName(e.target.value);
  }, [setFirstName]);
  const inputLastNameValue = useCallback((e) => {
    setLastName(e.target.value);
  }, [setLastName]);
  const inputEMailValue = useCallback((e) => {
    setEMail(e.target.value);
  }, [setEMail]);
  const inputPasswordValue = useCallback((e) => {
    setPassword(e.target.value);
  }, [setPassword]);
  const inputPasswordConfValue = useCallback((e) => {
    setPasswordConf(e.target.value);
  }, [setPasswordConf]);

  //登録ボタンを押した時に呼ばれる
  const submitForm = () => {
    Router.push("/login");
  };
  //クリアボタンを押した時に呼ばれる
  const formClear = () => {
    setFirstName("");
    setLastName("");
    setEMail("");
    setPassword("");
    setPasswordConf("");
  };
  return (
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
          value={eMail}
          type="text"
          fullWidth={false}
          required
          onChange={inputEMailValue}
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
      <div className="flex gap-3 mt-10">
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
  );
};
export default SingUp;
