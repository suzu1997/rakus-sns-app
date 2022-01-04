import { NextPage } from "next";
import Link from "next/link";
import { LunchSearchArea } from "../../components/LunchSearchArea";
import { LunchTab } from "../../components/LunchTab";
import { MenuBar } from "../../components/MenuBar";

/**
 * ランチの一覧ページ.
 * @remarks
 * タブの切り替えによって擬似的にURLも切り替わり、レビュー一覧またはお店一覧を表示
 */
const LunchListPage: NextPage = () => {
  return (
    <div className="flex">
      <MenuBar />
      <div className="flex-1 my-5 px-8">
        <h1 className="text-3xl">近くのランチ</h1>
        <Link href="/lunch/restaurant" passHref>
          <a className="underline">お店情報一覧へ</a>
        </Link>
        <div className="flex justify-between gap-8 flex-col-reverse items-center sm:flex-row sm:items-start">
          <LunchTab />
          <LunchSearchArea />
        </div>
      </div>
    </div>
  );
};

export default LunchListPage;
