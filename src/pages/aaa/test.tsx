import type { NextPage } from "next";
import Link from "next/link";

const Test: NextPage = () => {
  return (
    <>
      <main className="flex justify-center items-center flex-col min-h-screen ">
        <p className="font-mono text-red-700">テスト</p>
        <Link href="/">
          <a className="underline hover:text-blue-800 mt-3">トップへ戻る</a>
        </Link>
      </main>
    </>
  );
};

export default Test;
