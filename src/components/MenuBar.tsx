import { FC, memo, useEffect, useState } from "react";
import Link from "next/link";
import Cookie from "universal-cookie";

export const MenuBar: FC = memo(() => {
  //cookieを使用する
  const cookie = new Cookie();
  const [myInfo, setMyInfo] = useState("");

  //テスト時用(API作成後削除)
  useEffect(() => {
    if (cookie.get("id") === undefined) {
      setMyInfo("/user/1");
    } else {
      setMyInfo(`/user${cookie.get("id")}`);
    }
  }, []);

  //本番用
  //ユーザ情報のリンクをログインユーザ先にする
  // const [myInfo] = useState(`/user${loginUserId}`);

  return (
    <>
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <nav className="text-white text-base font-semibold bg-basic pt-3">
          <Link href="/aaa/test">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              HOME
            </a>
          </Link>
          <Link href={myInfo}>
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              プロフィール
            </a>
          </Link>
          <Link href="/aaa/test">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              通知
            </a>
          </Link>
          <Link href="/learcen/info">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              ラーセン内情報
            </a>
          </Link>
          <Link href="/lunch/review">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              ランチ情報
            </a>
          </Link>
          <Link href="/aaa/test">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              ログアウト
            </a>
          </Link>
        </nav>
      </aside>
    </>
  );
});
