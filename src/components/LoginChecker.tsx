import { memo, FC, useCallback } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";

/**
 * ログインチェックコンポーネント
 */
export const LoginChecker: FC = memo(() => {
  //ルーターリンク
  const router = useRouter();
  //cookieを使用する
  const cookie = new Cookie();

  /**
   * cookieをチェックしてログインページに飛ばす.
   */
  const cookieCheck = useCallback(() => {
    if (cookie.get("id") === undefined) {
      router.push("/login");
    }
  }, []);

  cookieCheck();

  return <>ログインチェッカー</>;
});
