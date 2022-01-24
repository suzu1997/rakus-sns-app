import { createContext, FC, ReactNode, useState } from "react";
import Cookie from "universal-cookie";

//contextを使用する
export const loginIdContext = createContext("");

type Props = {
  children: ReactNode;
};

/**
 * contextでログインIDを渡すコンポーネント.
 * @param props - props
 * @returns ログインID
 */
export const LoginIdProvider: FC<Props> = (props) => {
  const { children } = props;

  //cookie
  const cookie = new Cookie();
  const [loginId] = useState<string>(cookie.get("id"));

  return (
    <loginIdContext.Provider value={loginId}>
      {children}
    </loginIdContext.Provider>
  );
};
