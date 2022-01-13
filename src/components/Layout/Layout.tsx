import { FC, memo, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
//ログインチェッカーをONにしたいときコメント外す
import { LoginChecker } from "../Auth";
import { LoginIdProvider } from "../../providers/LoginIdProvider";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <LoginIdProvider>
        {/* <LoginChecker> */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* </LoginChecker> */}
      </LoginIdProvider>
    </div>
  );
});
