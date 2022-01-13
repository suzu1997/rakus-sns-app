import { TextInput } from "../../components/Form/TextInput";
import { useState, useCallback } from "react";
import { Button } from "../../components/Button/Button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

/**
 * ログインページ
 * @returns ログインするためのページ
 */
const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //ルーターリンク
  const router = useRouter();

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
    router.push("/");
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
      <Link href="/auth/forgetpass">
        <a className="underline hover:text-blue-800 mt-3">
          パスワードを忘れた方はコチラ
        </a>
      </Link>
    </div>
  );
};
export default Login;
