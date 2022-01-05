import { NextPage } from "next";
import { MenuBar } from "../../components/MenuBar";
import { SubHeader } from "../../components/SubHeader";
import Image from "next/image";
import Link from "next/link";

/**
 * ラーニングセンター基本情報画面.
 * @returns ラーニングセンターの基本情報の照会ページ
 */
const Info: NextPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        <div className="w-full">
          <SubHeader title="ラーセン基本情報" />
          <div className="ml-5 mt-5">
            <Link href="/">
              <a className="underline hover:text-blue-800 mt-3">→戻る</a>
            </Link>
          </div>
          {/* 基本情報 */}
          <div className="border-solid  border-2 border-bgc-200 m-5 shadow-lg rounded-md text-center">
            <div className="mt-3 text-xl font-bold">第二ラーニングセンター</div>
            <Image
              src="/usakus.jpg"
              width={100}
              height={100}
              alt="icon"
            ></Image>

            <div className="mb-5">
              <div>住所:東京都新宿区</div>
              <div>解放時間:毎週土曜日9:00-18:00</div>
            </div>
          </div>
          <div className="border-solid  border-2 border-bgc-200 m-5 shadow-lg rounded-md text-center">
            <div className="mt-3 text-xl font-bold">第一ラーニングセンター</div>
            <Image
              src="/usakus.jpg"
              width={100}
              height={100}
              alt="icon"
            ></Image>

            <div className="mb-5">
              <div>住所:東京都新宿区</div>
              <div>解放時間:毎週土曜日24h</div>
            </div>
          </div>
          <div className="border-solid  border-2 border-bgc-200 m-5 shadow-lg rounded-md text-center">
            <div className="mt-3 text-xl font-bold">本社</div>
            <Image
              src="/usakus.jpg"
              width={100}
              height={100}
              alt="icon"
            ></Image>

            <div className="mb-5">
              <div>住所:東京都新宿区</div>
              <div>解放時間:年中無休</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Info;
