//provider(値を渡す)
import { createContext, useState } from "react";
import Cookie from "universal-cookie";

export const loginIdContext = createContext({});

export const LoginIdProvider = () => {
  //cookie
  const cookie = new Cookie();
  const [loginId] = useState(cookie.get("id"));

  return <loginIdContext.Provider value={{ loginId }} />;
};
