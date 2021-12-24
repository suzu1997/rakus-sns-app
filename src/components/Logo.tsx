//Header ← HeaderTitle + Logo埋め込んでます.
//ラクラクSNSのロゴ
import { FC, memo } from "react";
import Image from "next/image";

export const Logo: FC = memo(() => {
  return (
    <>
      <span className="m-5">
        <Image
          src="/image/rakuraku-sns.png"
          width={50}
          height={50}
          alt="ロゴ"
        />
      </span>
    </>
  );
});
