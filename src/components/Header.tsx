//Header ← HeaderTitle + Logo埋め込んでます.
import { memo, FC } from "react";
import { Logo } from "./Logo";
import { HeaderTitle } from "./HeaderTitle";

export const Header: FC = memo(() => {
  //ヘッダー下線
  const headerStyle = {
    borderBottom: "5px solid orange",
  };

  return (
    <>
      <header className="h-16 w-full shadow-md bg-white" style={headerStyle}>
        <Logo />
        <HeaderTitle />
      </header>
    </>
  );
});
