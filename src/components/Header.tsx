import { memo, FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: FC = memo(() => {
  //ヘッダー下線
  const headerStyle = {
    borderBottom: "5px solid orange",
  };

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <>
      <header
        className="h-16 w-full shadow-md bg-white flex items-center"
        style={headerStyle}
      >
        <span className="ml-5">
          <Link href="/">
            <a className="flex items-center">
              <Image
                src="/image/rakuraku-sns.png"
                width={50}
                height={50}
                alt="ロゴ"
              />
              <span className="text-2xl text-gray-500 m-3">ラクラクSNS</span>
            </a>
          </Link>
        </span>

        <span className="ml-32 sm:hidden block">
          <button type="button" onClick={openMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </span>
      </header>
      <div className="relative">
        <aside className="absolute top-0 right-0 bg-sidebar h-screen w-64 shadow-xl">
          <nav className="text-white text-base font-semibold bg-basic pt-3">
            <Link href="/aaa/test">
              <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                HOME
              </a>
            </Link>
            <Link href="/">
              <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                プロフィール
              </a>
            </Link>
            <Link href="/notion">
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
            <Link href="/logout">
              <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                ログアウト
              </a>
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
});
