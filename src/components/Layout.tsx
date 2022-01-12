import { FC, memo, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoginChecker } from "./LoginChecker";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <LoginChecker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
});
