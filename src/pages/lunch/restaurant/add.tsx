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

const RestaurantAdd: FC = () => {
  const router = useRouter();
  // 店名で検索するキーワード
  const [searchName, setSearchName] = useState<string>("");

  /**
   * 検索窓のonChangeイベント発動時に実行するメソッド.
   */
  const inputRestaurantName = useCallback((e) => {
    setSearchName(e.target.value);
    // ここでオートコンプリート検索を行うAPIを叩く？？
    // APIできたら結果を格納するstateを作成して表示する
  }, []);

  // 検索結果
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<Array<any>>([]);

  // 登録するお店
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [restaurant, setRestaurant] = useState<any | null>();

  /**
   * ラーセンから1km以内かつ、店名で検索.
   * @remarks
   * &name_anyとすることで漢字でもかなでも検索できる
   */
  const searchByNameIn2km = async () => {
    // 作成したWebAPIエンドポイントを利用する
    // API Routeを使用することで、APIキーを隠せる
    const res = await axios.get(`/api/hotpepper?name_any=${searchName}`);

    setResult(res.data.shops);
  };

  /**
   * 検索結果から店を選択する.
   */
  const selectRestaurant = useCallback(
    (shop) => {
      // idでrestaurantsテーブルを参照して、すでに登録されているか確認
      //登録していれば店詳細ページに飛ぶ
      //登録していなければ、登録ページに飛ぶ
      // if (登録されている) {
      //   router.push(`/lunch/restaurant/${id}`);
      //   ’登録ずみでした’の表示
      // } else {
      //   //登録していなければ、選択肢した店の情報を表示
      //   setRestaurant(shop);
      //   setResult([]);
      // },

      alert("選択");
      setRestaurant(shop);
      setResult([]);
    },
    [setRestaurant],
  );

  const clear = useCallback(() => {
    setSearchName("");
    setResult([]);
    setRestaurant(null);
  }, []);

  return (
    <div className="flex">
      <div className="p-10">
        <h1 className="text-3xl">お店を新規登録するページ</h1>
        <div className="flex gap-5 mt-5 mb-5">
          <TextInput
            label={"店名"}
            value={searchName}
            type={"text"}
            fullWidth={false}
            required={true}
            onChange={inputRestaurantName}
          />
          <Button label="店名で検索(1km以内)" onClick={searchByNameIn2km} />
        </div>
        {/* <div>
          <p>もしかしてこのお店？</p>
          <div>データベースに登録済みの店表示</div>
          <div>{searchName}</div>
        </div> */}
        {/* 検索結果表示 */}
        {result.length > 0 && (
          <ul>
            {result.map((shop) => {
              return (
                <div key={shop.id} className="mb-3">
                  <li className="list-disc">
                    {shop.name}({shop.name_kana})
                    <Button
                      label="選択"
                      onClick={() => selectRestaurant(shop)}
                      size="xs"
                    />
                  </li>
                </div>
              );
            })}
          </ul>
        )}
        {restaurant && <AddByHotpepper restaurant={restaurant} clear={clear} />}
      </div>
    </div>
  );
};

export default RestaurantAdd;
