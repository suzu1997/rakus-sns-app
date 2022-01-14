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

    //仮登録、登録、ログインページ、トップページは除外

    if (path.includes("/auth/") || path === "/") {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [router.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <LoginIdProvider>
        {/* <LoginChecker> */}
        <Header />
        <div className="flex flex-1">
          {showMenu ? (
            <div className="lg:block md:block hidden">
              <MenuBar />
            </div>
          ) : (
            <></>
          )}
          <main className="flex-1">{children}</main>
        </div>

        <div className="relative bottom-0 left-0 w-full">
          <Footer />
        </div>

        {/* </LoginChecker> */}
      </LoginIdProvider>
    </div>
  );
});
