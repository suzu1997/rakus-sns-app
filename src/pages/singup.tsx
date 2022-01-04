import { useCallback, useState } from "react";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { SelectBox } from "../components/SelectBox";
import { Radio } from "../components/Radio";
import Router from "next/router";

const SingUp = () => {
  //メールアドレスのドメイン選択肢
  const options = [
    { id: "1", name: "@rakus-patners.co.jp" },
    { id: "2", name: "@rakus.co.jp" },
  ];
  //入社年の選択肢
  const hireYear = [
    { id: "2018", name: "2018年" },
    { id: "2019", name: "2019年" },
    { id: "2020", name: "2020年" },
    { id: "2021", name: "2021年" },
    { id: "2022", name: "2022年" },
    { id: "2023", name: "2023年" },
  ];
  //入社月の選択肢
  const hireMonth = [
    { id: "1", name: "1月" },
    { id: "4", name: "4月" },
    { id: "7", name: "7月" },
    { id: "10", name: "10月" },
  ];

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const [selectValue, setSelectValue] = useState<string>(options[0].name);
  const [selectHireYearValue, setSelectHireYearValue] = useState<string>(
    hireYear[0].name,
  );
  const [selectHireMonthValue, setSelectHireMonthValue] = useState<string>(
    hireMonth[0].name,
  );

  const inputFirstNameValue = useCallback(
    (e) => {
      setFirstName(e.target.value);
    },
    [setFirstName],
  );
  const inputLastNameValue = useCallback(
    (e) => {
      setLastName(e.target.value);
    },
    [setLastName],
  );
  const inputEmailValue = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );
  const inputPasswordValue = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );
  const inputPasswordConfValue = useCallback(
    (e) => {
      setPasswordConf(e.target.value);
    },
    [setPasswordConf],
  );

  //登録ボタンを押した時に呼ばれる
  const submitForm = () => {
    Router.push("/login");
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
      <div className="flex gap-3">
        <div className="mt-2">
          <SelectBox
            label="入社年"
            value={selectHireYearValue}
            select={setSelectHireYearValue}
            options={hireYear}
          />
        </div>
        <div className="mt-2">
          <SelectBox
            label="入社月"
            value={selectHireMonthValue}
            select={setSelectHireMonthValue}
            options={hireMonth}
          />
        </div>
      </div>
      <div className="mt-3">職種を選択してください</div>
      <div className="flex gap-5">
        <Radio value="ML" />
        <Radio value="QA" />
        <Radio value="CL" />
        <Radio value="FR" />
        <Radio value="Java" />
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
