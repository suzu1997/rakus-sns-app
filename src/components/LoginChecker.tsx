import { memo, FC, useCallback, useEffect, useState } from "react";
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
  //現在のパス
  const [path, setPath] = useState(router.pathname);
  useEffect(() => {
    setPath(router.pathname);
  }, [cookie, path, router.pathname]);

  /**
   * cookieをチェックして指定のページに飛ばす.
   * ログインしていない→ログインページに飛ばす
   * ログインしていてトップにいた場合→タイムラインページに飛ばす
   */
  const cookieCheck = useCallback(() => {
    if (cookie.get("id") === undefined) {
      router.push("/login");
    } else if (path === "/") {
      router.push("/timeline");
    }
  }, []);

  useEffect(() => {
    cookieCheck();
  });

  return null;
});
