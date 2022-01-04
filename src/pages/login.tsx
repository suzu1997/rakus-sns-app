import { TextInput } from "../components/TextInput";
import { useState, useCallback } from "react";
import { Button } from "../components/Button";
import Router from "next/router";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  //ログインボタンを押した時に呼ばれる
  const submitForm = () => {
    Router.push("/");
  };
  //クリアボタンを押した時に呼ばれる
  const formClear = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-96 mt-3">
        <TextInput
          label="メールアドレス"
          value={email}
          type="text"
          fullWidth={true}
          required
          onChange={inputEmailValue}
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
