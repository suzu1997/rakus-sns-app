import { TextInput } from "../components/TextInput";
import { useState, useCallback } from "react";
import { Button } from "../components/Button";
import Router from "next/router";

const Login = () => {
  const [eMail, setEMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputEMailValue = useCallback(
    (e) => {
      setEMail(e.target.value);
    },
    [setEMail],
  );
  const inputPasswordValue = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );

  //ログインボタンを押した時に呼ばれる
  const submitForm = () => {
    Router.push("/");
  };
  //クリアボタンを押した時に呼ばれる
  const formClear = () => {
    setEMail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-96 mt-3">
        <TextInput
          label="メールアドレス"
          value={eMail}
          type="text"
          fullWidth={true}
          required
          onChange={inputEMailValue}
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
      <div className="flex gap-3 mt-10">
        <Button
          label="ログイン"
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
      </div>
    </div>
  );
};
export default Login;
