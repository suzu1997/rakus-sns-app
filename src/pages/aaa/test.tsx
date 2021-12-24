import type { NextPage } from "next";
import Link from "next/link";

const Test: NextPage = () => {
  return (
    <div className='flex flex-col items-center mt-10'>
      <p className="font-mono text-red-700">テスト</p>
      <Link href="/">
        <a className="underline hover:text-blue-800 mt-3">トップへ戻る</a>
      </Link>
    </div>
  );
};

export default Test;
