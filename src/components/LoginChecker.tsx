import { memo, FC, useEffect, useState } from "react";
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
  //ログインID
  const [loginId, setLoginId] = useState(cookie.get("name"));

  /**
   * cookieをチェックして指定のページに飛ばす.
   * ログインしていない→ログインページに飛ばす
   * ログインしていてトップにいた場合→タイムラインページに飛ばす
   */
  useEffect(() => {
    //現在のパス
    const path = router.pathname;

    //仮登録、登録、ログインページは除外
    if (path != "/presingup" && path != "/singup" && path != "/login") {
      //IDが入っていなければ/loginへ
      if (!loginId) {
        router.push("/login");
        //トップページ＆ログインしている→タイムラインページへ
      } else if (path === "/") {
        router.push("/timeline");
      }
    }
    //現在のパスが変わったら発動
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return null;
});
