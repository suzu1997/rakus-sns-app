import { memo, FC, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { loginIdContext } from "./Provider";

/**
 * ログインチェックコンポーネント
 */
export const LoginChecker: FC = memo(() => {
  //ルーターリンク
  const router = useRouter();
  //ログインID
  const loginId = useContext(loginIdContext);

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
