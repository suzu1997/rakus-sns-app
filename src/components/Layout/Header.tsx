import { memo, FC, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuBar } from "./MenuBar";

export const Header: FC = memo(() => {
  //ヘッダー下線
  const headerStyle = {
    borderBottom: "5px solid orange",
  };

  //ルーターリンク
  const router = useRouter();
  //メニューバー表示非表示
  const [isOpen, setIsOpen] = useState(false);
  //メニューバーのボタン表示非表示
  const [showMenuBtn, setShowMenuBtn] = useState(true);

  /**
   * メニューバーの開閉.
   * @remarks [isOpen]入れないと反映しないため入れています
   */
  const openMenu = useCallback(() => {
    {
      isOpen ? setIsOpen(false) : setIsOpen(true);
    }
  }, [isOpen]);

  /**
   * 画面切り替えでメニュー閉じる.
   */
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  /**
   * 特定のパスの場合、メニューボタンを非表示に.
   */
  useEffect(() => {
    //現在のパス
    const path = router.pathname;
    if (
      path === "/auth/presingup" ||
      path === "/auth/signup" ||
      path === "/auth/login" ||
      path === "/"
    ) {
      setShowMenuBtn(false);
    } else {
      setShowMenuBtn(true);
    }
  }, [router.pathname]);

  return (
    <>
      <header
        className="h-16 w-full shadow-md bg-white flex"
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
        {showMenuBtn ? (
          <span className="ml-auto mr-5 mt-5 lg:hidden md:hidden block">
            <button type="button" onClick={openMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </span>
        ) : (
          <></>
        )}
      </header>
      <div>
        {isOpen ? (
          <div className="relative z-40">
            <div className="absolute top-0 right-0">
              <MenuBar />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
});
