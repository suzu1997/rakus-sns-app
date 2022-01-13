import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "../components/Button/Button";
import { MenuBar } from "../components/Layout/MenuBar";
import Cookie from "universal-cookie";

const Home: NextPage = () => {
  /**
   * クッキーテスト.
   */
  const cookie = new Cookie();
  const checkTest = () => {
    console.log("ログインしているのは：" + cookie.get("name"));
  };

  return (
    <>
      <button type="button" onClick={checkTest}>
        ログイン状況
      </button>{" "}
      <div className="flex">
        <MenuBar />
        <div className="flex-col items-center mt-10 flex">
          <p className="font-mono text-text-brown">
            ランチックスを作るよ テスト
          </p>
          <Button
            label="ボタン"
            onClick={() => {
              alert("ボタンが押されました");
            }}
          />
          <Button
            backgroundColor="#f6f0ea"
            color="#622d18"
            label="SubButton"
            onClick={() => {
              alert("サブ");
            }}
            size="md"
          />
          <Link href="/aaa/test">
            <a className="underline hover:text-blue-800 mt-3">リンクです</a>
          </Link>
          <Link href="/auth/presignup">
            <a className="underline hover:text-blue-800 mt-3">
              ユーザー仮登録画面
            </a>
          </Link>
          <Link href="/auth/signup">
            <a className="underline hover:text-blue-800 mt-3">
              ユーザー本登録画面
            </a>
          </Link>
          <Link href="/timeline">
            <a className="underline hover:text-blue-800 mt-3">タイムライン</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
