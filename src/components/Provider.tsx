//provider(値を渡す)
import { createContext, FC, ReactNode, useState } from "react";
import Cookie from "universal-cookie";

export const loginIdContext = createContext({});

type Props = {
  children: ReactNode;
};

export const LoginIdProvider: FC<Props> = (props) => {
  const { children } = props;

  //cookie
  const cookie = new Cookie();
  const [loginId] = useState(cookie.get("id"));

  return (
    <loginIdContext.Provider value={{ loginId }}>
      {children}
    </loginIdContext.Provider>
  );
};
