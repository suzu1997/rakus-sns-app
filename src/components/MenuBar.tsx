import { FC, memo } from "react";
import Link from "next/link";

export const MenuBar: FC = memo(() => {
  return (
    <>
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <nav className="text-white text-base font-semibold bg-basic pt-3">
          <Link href="/aaa/test">
            <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
              HOME
            </a>
          </Link>
          <Link href="/user">
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
