import { NextPage } from "next";
import Link from "next/link";

/**
 * 本会員登録完了ページ.
 * @returns 本会員登録が完了した際に表示するページ
 */
const CompSignUp: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10 h-48 shadow-sm  text-center">
        <div className="text-xl sm:text-3xl lg:text-3xl text-text-brown mt-5 font-bold ">
          会員登録が完了しました
        </div>
        <div className="mt-10">
          <Link href="/auth/login">
            <a className="underline hover:text-blue-800 mt-3">
              ログインページはコチラから
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default CompSignUp;
