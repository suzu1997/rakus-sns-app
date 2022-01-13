import { FC, memo, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
//ログインチェッカーをONにしたいときコメント外す
import { LoginChecker } from "../Auth";
import { LoginIdProvider } from "../../providers/LoginIdProvider";
import { MenuBar } from "./MenuBar";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <div className="flex flex-col ">
      <LoginIdProvider>
        {/* <LoginChecker> */}
        <Header />
        <div className="flex  min-h-screen">
          <div className="hidden md:block lg:block">
            <MenuBar />
          </div>
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
        {/* </LoginChecker> */}
      </LoginIdProvider>
    </div>
  );
});
