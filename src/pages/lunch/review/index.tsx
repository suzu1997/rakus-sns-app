import { NextPage } from "next";
import Link from "next/link";
import { LunchSearchArea } from "../../../components/LunchSearchArea";
import LunchTabList from "../../../components/LunchTabList";
import { MenuBar } from "../../../components/MenuBar";

const LunchReviewList: NextPage = () => {
  return (
    <div className="flex">
      <MenuBar />
      <div className="flex-1 my-5 px-8">
        <h1 className="text-3xl">近くのランチ</h1>
        <Link href="/lunch/restaurant" passHref>
          <a className="underline">
            お店情報一覧へ
          </a>
        </Link>
        <div className="flex justify-between gap-8 flex-col-reverse items-center sm:flex-row sm:items-start">
          <LunchTabList />
          <LunchSearchArea />
        </div>
      </div>
    </div>
  );
};

export default LunchReviewList;
