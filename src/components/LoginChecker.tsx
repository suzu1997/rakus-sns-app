import { memo, FC } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

export const LoginChecker: FC = memo(() => {
  //ルーターリンク
  const router = useRouter();

  const cookie = new Cookie();
  if (cookie.get("id") === undefined) {
    router.push("/login");
  }

  return <>ログインチェッカー</>;
});
