import { memo, FC, useEffect, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { loginIdContext } from "../providers/LoginIdProvider";

type Props = {
  children: ReactNode;
};

/**
 * ログインチェックコンポーネント
 */
export const LoginChecker: FC<Props> = memo((props) => {
  const { children } = props;
  //ルーターリンク
  const router = useRouter();
  //ログインID
  const loginId = useContext(loginIdContext);
  //ローディングフラグ
  const [flug, setFlug] = useState(false);

  /**
   * cookieをチェックして指定のページに飛ばす.
   * ログインしていない→ログインページに飛ばす
   * ログインしていてトップにいた場合→タイムラインページに飛ばす
   */
  useEffect(() => {
    //現在のパス
    const path = router.pathname;

    //仮登録、登録、ログインページは除外
    if (path != "/auth/presingup" && path != "/auth/singup" && path != "/auth/login") {
      //IDが入っていなければ/loginへ
      if (!loginId) {
        router.push("/auth/login");
        //トップページ＆ログインしている→タイムラインページへ
      } else if (path === "/") {
        setFlug(true);
        router.push("/timeline");
      }
    } else {
      setFlug(true);
    }
    //現在のパスが変わったら発動
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  /**
   * ログインしているか読み込み中はローディングを表示.
   */
  return <>{flug ? <>{children}</> : <></>}</>;
});
