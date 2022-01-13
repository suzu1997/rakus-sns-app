import { FC, memo, ReactNode, useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
//ログインチェッカーをONにしたいときコメント外す
import { LoginChecker } from "../Auth";
import { LoginIdProvider } from "../../providers/LoginIdProvider";
import { MenuBar } from "./MenuBar";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;

  //ルーターリンク
  const router = useRouter();
  //メニューバー表示非表示
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    //現在のパス
    const path = router.pathname;

    //仮登録、登録、ログインページは除外
    if (
      path === "/auth/presingup" ||
      path === "/auth/singup" ||
      path === "/auth/login" ||
      path === "/"
    ) {
      setShowMenu(false);
    }
  }, [showMenu, router.pathname]);

  return (
    <div className="flex flex-col ">
      <LoginIdProvider>
        {/* <LoginChecker> */}
        <Header />
        <div className="flex  min-h-screen">
          {showMenu ? (
            <div className="hidden md:block lg:block">
              <MenuBar />
            </div>
          ) : (
            <></>
          )}
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
        {/* </LoginChecker> */}
      </LoginIdProvider>
    </div>
  );
});
