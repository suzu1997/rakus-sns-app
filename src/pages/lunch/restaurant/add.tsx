import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axiosJsonpAdapter = require("axios-jsonp");
import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "../../../components/Button";
import { MenuBar } from "../../../components/MenuBar";
import { TextInput } from "../../../components/TextInput";
import { useRouter } from "next/router";
import { HOTPEPPER_URL } from "../../../utils/const";
import { SelectBox } from "../../../components/SelectBox";

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

  // 店舗のタイプの選択肢
  const typeOptions = [
    { id: "1", name: "店内" },
    { id: "2", name: "お弁当" },
    { id: "3", name: "両方" },
  ];

  // 登録する店舗のタイプ
  const [type, setType] = useState<string>(typeOptions[0].name);

  /**
   * ラーセンから1km以内かつ、店名で検索.
   * @remarks
   * &name_anyとすることで漢字でもかなでも検索できる
   */
  const searchByNameIn2km = async () => {
    // ホットペッパーAPIは、サーバー側でのみデータフェッチ可
    // （クライアント側（JavaScriptによるブラウザ側）では不可のため、CORSによりブロックされてしまう。）
    // そのためJSONPでCORSエラー回避する

    // jsonpのためaxiosにてデータフェッチ
    const res = await axios.get(
      `${HOTPEPPER_URL}&name_any=${searchName}&lat=35.689445&lng=139.70735&range=3&count=50`,
      {
        adapter: axiosJsonpAdapter,
      },
    );
    setResult(res.data.results.shop);
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

  /**
   * 店舗を登録する.
   */
  const register = useCallback(
    (id) => {
      // 店の情報と入力させたタイプをAPIに渡して登録
      router.push(`/lunch/restaurant/${id}`);
      alert("登録しました");
    },
    [router],
  );

  const clear = useCallback(() => {
    setSearchName("");
    setResult([]);
    setRestaurant(null);
  }, []);

  return (
    <div className="flex">
      <MenuBar />
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
        <div>
          <p>もしかしてこのお店？</p>
          <div>データベースに登録済みの店表示</div>
          <div>{searchName}</div>
        </div>
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
        {restaurant && (
          <div>
            <li className="list-disc">
              {restaurant.name}({restaurant.name_kana})
            </li>
            <div className="ml-10 mt-5">
              <Image
                src={restaurant.photo.pc.l}
                alt="image"
                width={300}
                height={200}
              />
            </div>
            <p className="ml-10">-ID: {restaurant.id}</p>
            <p className="ml-10">
              -ジャンル: {restaurant.genre.name}({restaurant.genre.code})
            </p>
            <p className="ml-10">-お店キャッチ: {restaurant.catch}</p>
            <p className="ml-10">-住所: {restaurant.address}</p>
            <p className="ml-10">-交通アクセス: {restaurant.access}</p>
            <p className="ml-10">
              -店舗URL:{" "}
              <a href={restaurant.urls.pc} className="hover:text-blue-700">
                {restaurant.urls.pc}
              </a>
            </p>
            <div className="w-1/3 ml-10 mt-5">
              <SelectBox
                label="タイプ(店内・お弁当・両方)"
                value={type}
                select={setType}
                options={typeOptions}
              ></SelectBox>
            </div>
            <div className="ml-10 mt-5 flex justify-center gap-3">
              <Button
                label="新規登録"
                onClick={() => register(restaurant.id)}
              />
              <Button
                label="クリア"
                onClick={clear}
                backgroundColor="#f6f0ea"
                color="#622d18"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantAdd;
