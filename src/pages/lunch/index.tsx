import type { NextPage } from "next";
import { useRouter } from "next/router";

import { SubHeader } from "../../components/Layout/SubHeader";
import { Button } from "../../components/Button/Button";
import { LunchTab } from "../../components/Lunch/LunchTab";

/**
 * ランチの一覧ページ.
 * @remarks
 * タブの切り替えによってレビュー一覧またはお店一覧を表示
 *
 * @returns ランチの一覧を表示する画面
 */
const LunchListPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <SubHeader title={"近くのランチ"} />
      <div className="text-center mt-3">
        <Button
          label={"店検索andレビュー投稿"}
          onClick={() => router.push("/lunch/restaurant/search")}
          size="lg"
        />
      </div>
      <div className="mt-5 flex justify-between gap-8 flex-col-reverse items-center sm:flex-row sm:items-start">
        <div className="flex flex-col w-full">
          <LunchTab />
        </div>
      </div>
    </>
  );
};

export default LunchListPage;
