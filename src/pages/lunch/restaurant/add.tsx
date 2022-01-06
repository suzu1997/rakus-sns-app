import axios from "axios";
import { FC, useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "../../../components/Button";
import { MenuBar } from "../../../components/MenuBar";
import { TextInput } from "../../../components/TextInput";
import { useRouter } from "next/router";
import { HOTPEPPER_URL } from "../../../utils/const";

const RestaurantAdd: FC = () => {
  const router = useRouter();
  // 店名で検索するキーワード
  const [searchName, setSearchName] = useState<string>("");

  const inputRestaurantName = useCallback((e) => {
    setSearchName(e.target.value);
  }, []);

  // ホットペッパー検索テスト

  // 検索結果
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<Array<any>>([]);

  // 登録するお店
  const [restaurant, setRestaurant] = useState<any | null>();

  // const [address, setAddress] = useState<string>("");

  // const inputAddress = useCallback(
  //   (e) => {
  //     setAddress(e.target.value);
  //   },
  //   [setAddress],
  // );

  /**
   * ラーセンから1km以内かつ、店名で検索.
   * @remarks
   * &name_anyとすることで漢字でもかなでも検索できる
   */
  const searchByNameInIn2km = async () => {
    const res = await axios.get(
      `${HOTPEPPER_URL}&name_any=${searchName}&lat=35.689445&lng=139.70735&range=3&count=50`,
    );
    console.log(res.data.results);
    console.log(res.data.results.shop);

    setResult(res.data.results.shop);
  };

  const selectRestaurant = useCallback(
    (shop) => {
      alert("選択");
      setRestaurant(shop);
      setResult([]);
    },
    [setRestaurant],
  );

  const register = useCallback(() => {
    router.push("/lunch/review");
    alert("登録しました");
  }, [router]);

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
        <TextInput
          label={"店名"}
          value={searchName}
          type={"text"}
          fullWidth={true}
          required={true}
          onChange={inputRestaurantName}
        />
        <Button label="店名で検索(1km以内)" onClick={searchByNameInIn2km} />
        {/* 検索結果表示 */}
        {result && (
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
            <div>
              <Image
                src={restaurant.photo.pc.l}
                alt="image"
                width={300}
                height={200}
              />
            </div>
            <p className="ml-10">-ジャンル: {restaurant.genre.name}</p>
            <p className="ml-10">-お店キャッチ: {restaurant.catch}</p>
            <p className="ml-10">-住所: {restaurant.address}</p>
            <p className="ml-10">-交通アクセス: {restaurant.access}</p>
            <p className="ml-10">
              -店舗URL:{" "}
              <a href={restaurant.urls.pc} className="hover:text-blue-700">
                {restaurant.urls.pc}
              </a>
            </p>
            <p className="mt-10">よかったら一緒にレビューも投稿してね</p>
            <textarea
              cols={30}
              rows={10}
              className="border border-gray-300 shadow-md outline-none rounded-lg focus:outline-none focus:border-basic focus-visible:ring-white sm:text-sm"
            />
            <div>
              <Button label="新規登録" onClick={register} />
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
