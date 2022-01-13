import { memo, FC, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: FC = memo(() => {
  //ヘッダー下線
  const headerStyle = {
    borderBottom: "5px solid orange",
  };

  //ルーターリンク
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

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
      <div>
        {isOpen ? (
          <div className="relative z-40">
            <div className="absolute top-0 right-0">
              <aside className="relative bg-bgc h-screen w-64">
                <nav className="text-white text-base font-semibold bg-basic pt-3">
                  <Link href="/aaa/test">
                    <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                      HOME
                    </a>
                  </Link>
                  <Link href="/timeline">
                    <a className="flex items-center opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                      タイムライン
                    </a>
                  </Link>
                  <Link href="/user/1">
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
});
