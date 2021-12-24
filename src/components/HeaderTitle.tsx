//Header ← HeaderTitle + Logo埋め込んでます.
import { memo, FC } from "react";

export const HeaderTitle: FC = memo(() => {
  return (
    <>
      <span className="text-2xl text-gray-500 m-3">ラクラクSNS</span>
    </>
  );
});
