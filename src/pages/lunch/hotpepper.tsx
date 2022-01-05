import axios from "axios";
import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "../../components/Button";
import { MenuBar } from "../../components/MenuBar";
import { TextInput } from "../../components/TextInput";

const Hotpepper: FC = () => {
  // 店名で検索するキーワード
  const [searchName, setSearchName] = useState("");

  const inputRestaurantName = useCallback((e) => {
    setSearchName(e.target.value);
  }, []);

  // ホットペッパー検索テスト
  // API のURL
  const URL =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=d358529c334d432a&format=json";
  // 検索結果
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<Array<any>>([]);

  /**
   * 新宿内の店情報を検索するメソッド.
   * @remarks
   * &middle_area=Y055で新宿で絞り込める
   */
  const searchInShinjuku = async () => {
    const res = await axios.get(`${URL}&middle_area=Y055&count=50`);
    console.log(res.data.results);
    console.log(res.data.results.shop);

    setResult(res.data.results.shop);
  };
  /**
   * ラーセンから1km以内で検索.
   * @remarks
   * &latで緯度、&lngで経度を指定、&range=3で1km以内
   */
  const searchIn2km = async () => {
    const res = await axios.get(
      `${URL}&lat=35.689445&lng=139.70735&range=3&count=50`,
    );
    console.log(res.data.results);
    console.log(res.data.results.shop);
    console.log(res.data.results.shop[0].photo.pc.s);

    setResult(res.data.results.shop);
  };

  /**
   * ラーセンから1km以内かつ、店名で検索.
   * @remarks
   * &name_anyとすることで漢字でもかなでも検索できる
   */
  const searchByNameInIn2km = async () => {
    const res = await axios.get(
      `${URL}&name_any=${searchName}&lat=35.689445&lng=139.70735&range=3&count=50`,
    );
    console.log(res.data.results);
    console.log(res.data.results.shop);

    setResult(res.data.results.shop);
  };

  return (
    <div className="flex">
      <MenuBar />
      <div className="p-10">
        <h1 className="text-3xl">ホットペッパーテスト</h1>
        <TextInput
          label={"店名"}
          value={searchName}
          type={"text"}
          fullWidth={true}
          required={true}
          onChange={inputRestaurantName}
        />
        <Button label="店名で検索(1km以内)" onClick={searchByNameInIn2km} />
        <Button label="新宿内を検索" onClick={searchInShinjuku} />
        <Button label="ラーセン(第2)から1km以内" onClick={searchIn2km} />
        <div className="mt-10">
          <p>検索結果(最大50件)</p>
          {result && (
            <ul>
              {result.map((shop) => {
                return (
                  <div key={shop.id}>
                    <li className="list-disc">
                      {shop.name}({shop.name_kana})
                    </li>
                    <p className="ml-10">-住所: {shop.address}</p>
                    <p className="ml-10">-緯度: {shop.lat} 経度: {shop.lng}</p>
                    <p className="ml-10">-ジャンル: {shop.genre.name}</p>
                    <p className="ml-10">-お店キャッチ: {shop.catch}</p>
                    <p className="ml-10">-交通アクセス: {shop.access}</p>
                    <p className="ml-10">-店舗URL: {shop.urls.pc}</p>
                    <Image src={shop.photo.pc.s} alt="image" width={150} height={100}/>
                  </div>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hotpepper;
