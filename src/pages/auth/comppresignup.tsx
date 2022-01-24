import { NextPage } from "next";
import Link from "next/link";

/**
 * 仮登録完了画面.
 * @returns 仮登録が完了した際に表示する画面
 */
const CompPreSignUp: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10 h-64 sm:h-48 lg:h-48 shadow-sm  text-center">
        <div className="text-lg sm:text-2xl lg:text-3xl text-text-brown mt-5 font-bold ">
          ご登録いただいたメールアドレス宛にメールを送信しました
        </div>
        <div className="text-center text-sm mt-5">
          送信したメールより本登録をお願いします
        </div>
        <div className="mt-10 text-sm">
          しばらく待っていただいて届かない場合は
          <Link href="/auth/presignup">
            <a className="underline hover:text-blue-800 mt-3">コチラ</a>
          </Link>
          から再度お手続きをお願いします
        </div>
      </div>
    </>
  );
};
export default CompPreSignUp;
