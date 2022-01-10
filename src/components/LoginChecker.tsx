import { memo, FC } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

/**
 * ログインチェックコンポーネント
 */
export const LoginChecker: FC = memo(() => {
  //ルーターリンク
  const router = useRouter();

  /**
   * cookieをチェックしてログインページに飛ばす.
   */
  const cookie = new Cookie();
  if (cookie.get("id") === undefined) {
    router.push("/login");
  }

  return <>ログインチェッカー</>;
});
