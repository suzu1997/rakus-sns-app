import { NextPage } from "next";
import Link from "next/link";

/**
 * パスワード変更完了画面.
 * @returns パスワードの変更が完了した際に表示する画面
 */
const CompUpdatePass: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10 h-48 shadow-sm  text-center">
        <div className="text-lg sm:text-3xl lg:text-3xl text-text-brown mt-5 font-bold ">
          パスワードの変更が完了しました
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
export default CompUpdatePass;
