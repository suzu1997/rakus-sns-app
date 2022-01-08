import { NextPage } from "next";
import Link from "next/link";

const CompSingUp: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10 h-48 shadow-sm  text-center">
        <div className="text-3xl text-text-brown mt-5 font-bold ">
          会員登録が完了しました
        </div>
        <div className="mt-10">
          <Link href="/login">
            <a className="underline hover:text-blue-800 mt-3">
              ログインページはコチラから
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default CompSingUp;
