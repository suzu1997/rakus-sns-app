import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "../../../components/Button/Button";
import { TextInput } from "../../../components/Form/TextInput";
import { useRouter } from "next/router";
import { JAVA_API_URL } from "../../../utils/const";
import { SelectBox } from "../../../components/Form/SelectBox";
import { AddByHotpepper } from "../../../components/Lunch/AddByHotpepper";
import toast from "react-hot-toast";
import { Restaurant } from "../../../types/type";
import { AddManuallyForm } from "../../../components/Lunch/AddManuallyForm";
import Link from "next/link";

const RestaurantAdd: FC = () => {
  const router = useRouter();

  const hotpepperId = router.query.hotpepperId;
  console.log(hotpepperId);

  // 登録するお店
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [restaurant, setRestaurant] = useState<any | null>();

  const [manually, setManually] = useState<boolean>(false);

  /**
   * ページを初期状態に戻す.
   */
  const clear = useCallback(() => {
    alert("キャンセル");
  }, []);

  return (
    <div className="flex">
      <div className="p-10">
        <h1 className="text-3xl">お店を新規登録するページ</h1>
        <Link href="/lunch/restaurant/search">
          <a className="underline hover:text-blue-800 mt-3">
            お店を検索するページ
          </a>
        </Link>
        {/* 表示確認用の仮置き */}
        <AddManuallyForm clear={clear} />

        {/* ホットペッパーにある店を登録する画面 */}
        {restaurant && <AddByHotpepper restaurant={restaurant} clear={clear} />}
        {/* 手入力で店を登録する画面 */}
        {manually && <AddManuallyForm clear={clear} />}
      </div>
    </div>
  );
};

export default RestaurantAdd;
