import { FC } from "react";
import { useRouter } from "next/router";
import { AddByHotpepper } from "../../../components/Lunch/AddByHotpepper";
import { AddManuallyForm } from "../../../components/Lunch/AddManuallyForm";
import Link from "next/link";


const RestaurantAdd: FC = () => {
  const router = useRouter();

  // URLのパラメータからホットペッパーIDを取得
  const hotpepperId = router.query.hotpepperId;

  /**
   * お店の登録をキャンセルする.
   *
   * @remarks
   * お店検索ページに戻る。
   */
  const cansel = () => {
    router.push("/lunch/restaurant/search");
  };

  return (
    <div className="flex">
      <div className="p-10">
        <h1 className="text-3xl">お店を新規登録するページ</h1>
        <Link href="/lunch/restaurant/search">
          <a className="underline hover:text-blue-800 mt-3">
            お店を検索するページ
          </a>
        </Link>
        {typeof hotpepperId === "string" ? (
          <>
            {/* ホットペッパーにある店を登録する画面 */}
            <AddByHotpepper hotpepperId={hotpepperId} cansel={cansel} />
          </>
        ) : (
          <>
            {/* 手入力で店を登録する画面 */}
            <AddManuallyForm cansel={cansel} />
          </>
        )}
      </div>
    </div>
  );
};

export default RestaurantAdd;
