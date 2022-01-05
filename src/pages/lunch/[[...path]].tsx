import { NextPage } from "next";
import { LunchSearchArea } from "../../components/lunch/LunchSearchArea";
import { LunchTab } from "../../components/lunch/LunchTab";
import { MenuBar } from "../../components/MenuBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubHeader } from "../../components/SubHeader";

/**
 * ランチの一覧ページ.
 * @remarks
 * タブの切り替えによって擬似的にURLも切り替わり、レビュー一覧またはお店一覧を表示
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
      {/* <div className="w-10/12"> */}
      {/* </div> */}
      <div className="flex-1 w-10/12">
        <SubHeader title={"近くのランチ"} />
        <div className="my-5 px-8 flex justify-between gap-8 flex-col-reverse items-center sm:flex-row sm:items-start">
          <div className="flex flex-col w-full">
            <LunchTab path={path} />
          </div>
          <LunchSearchArea />
        </div>
      </div>
    </div>
  );
};

export default LunchListPage;
