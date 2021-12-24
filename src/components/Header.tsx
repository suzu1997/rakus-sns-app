//Header ← HeaderTitle + Logo埋め込んでます.
import { memo, FC } from "react";
import Image from "next/image";

export const Header: FC = memo(() => {
  //ヘッダー下線
  const headerStyle = {
    borderBottom: "5px solid orange",
  };

  const style = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <header className="h-16 w-full shadow-md bg-white" style={headerStyle}>
        <div style={style} className={"ml-5"}>
          <Image
            src="/image/rakuraku-sns.png"
            width={50}
            height={50}
            alt="ロゴ"
          />
          <span className="text-2xl text-gray-500 m-3">ラクラクSNS</span>
        </div>
      </header>
    </>
  );
});
