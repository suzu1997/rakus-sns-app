import { NextPage } from "next";
import { LunchTab } from "../../components/Lunch/LunchTab";
import { MenuBar } from "../../components/MenuBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubHeader } from "../../components/Layout/SubHeader";
import { Button } from "../../components/Button";

/**
 * ランチの一覧ページ.
 * @remarks
 * タブの切り替えによって擬似的にURLも切り替わり、レビュー一覧またはお店一覧を表示
 *
 * @returns ランチの一覧を表示する画面
 */
const LunchListPage: NextPage = () => {
  // レビューのタブにいるか店情報のタブにいるか
  const [path, setPath] = useState<string>("review");
  const router = useRouter();

  // URLのパスが変わるたびに実行する
  useEffect(() => {
    // URLからタブを取得
    const path = router.query.path;
    if (path !== undefined) {
      setPath(path[0]);
    }
  }, [router.query.path]);

  return (
    <div className="flex">
      <MenuBar />
      <div className="flex-1 w-10/12">
        <SubHeader title={"近くのランチ"} />
        <div className="flex gap-3 ml-8">
          <Button
            label={"店追加"}
            onClick={() => router.push("/lunch/restaurant/add")}
            size="lg"
          />
          <Button
            label={"ホットペッパーテスト"}
            onClick={() => router.push("/lunch/hotpepper")}
            size="lg"
          />
        </div>
        <div className="my-5 px-8 flex justify-between gap-8 flex-col-reverse items-center sm:flex-row sm:items-start">
          <div className="flex flex-col w-full">
            <LunchTab path={path} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LunchListPage;
