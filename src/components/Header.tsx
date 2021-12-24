import { memo, FC } from "react";
import { Logo } from "./Logo";
import { HeaderTitle } from "./HeaderTitle";

export const Header: FC = memo(() => {
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
