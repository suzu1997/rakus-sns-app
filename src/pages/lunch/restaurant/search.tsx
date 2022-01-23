import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { FC, useCallback, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { TextInput } from "../../../components/Form/TextInput";
import { useRouter } from "next/router";
import { Restaurant } from "../../../types/type";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { JAVA_API_URL } from "../../../utils/const";

const RestaurantSearch: FC = () => {
  const router = useRouter();
  // 店名で検索するキーワード
  const [searchName, setSearchName] = useState<string>("");

  // データベースに登録済みの店一覧
  const [restautrantsInDB, setRestaurantsInDB] = useState<Array<Restaurant>>(
    [],
  );

  // ホットペッパーからの検索結果
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [hotpeppers, setHotpeppers] = useState<Array<any>>([]);

  // 検索ボタンが押されたかどうか
  const [hasClickedSearch, setHasClickedSearch] = useState<boolean>(false);

  /**
   * 検索窓のonChangeイベント発動時に実行するメソッド.
   *
   * @remarks
   * setStateを使って検索文字列のstateを更新
   */
  const inputRestaurantName = useCallback(async (e) => {
    setSearchName(e.target.value);
  }, []);

  /**
   * 検索窓のonKeyUpイベント発動時に実行するメソッド.
   *
   * @remarks
   * データベースに登録済みの店を検索するAPIを叩く
   */
  const searchInDB = useCallback(async () => {
    try {
      // 検索文字列が空白でない場合のみ検索を実行
      if (searchName !== "") {
        const res = await axios.get(
          `${JAVA_API_URL}/restaurant/name/${searchName}`,
        );
        if (res.data.restaurant) {
          // 検索結果がある場合はその店を表示
          setRestaurantsInDB(res.data.restaurant);
        } else {
          // 検索結果が無ければ空の配列をセット
          setRestaurantsInDB([]);
        }
      } else {
        // 検索文字列が空白の場合は空の配列をセット
        setRestaurantsInDB([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchName]);

  /**
   * ラーセンから1km以内かつ、店名で検索.
   * @remarks
   * &name_anyとすることで漢字でもかなでも検索できる
   */
  const searchByNameIn2km = async () => {
    if (searchName === "") {
      alert("検索文字列を入力してください");
      return;
    }

    // 作成したWebAPIエンドポイントを利用する
    // API Routeを使用することで、APIキーを隠せる
    const res = await axios.get(`/api/hotpepper?name_any=${searchName}`);
    console.log(res.data);

    setHotpeppers(res.data.shops);
    setHasClickedSearch(true);
  };

  /**
   * ホットペッパーからの検索結果から店を選択する.
   *
   * @param hotpepper - 選択した店の情報
   */
  const selectRestaurant = useCallback(
    async (hotpepper) => {
      // すでに登録されているホットペッパーIDかを確認し、登録済みなら詳細ページへ遷移
      // const res = await axios.get(
      //   `${JAVA_API_URL}/restaurants/hp/${hotpepper.id}`,
      // );
      // if (true) {
      //   // router.push(`/lunch/restaurant/${res.data.shop.id}`);
      //   router.push("/lunch/restaurant/1");
      //   toast("登録済みの為、詳細ページへ遷移しました", {
      //     // Custom Icon
      //     icon: "ℹ️",
      //   });
      //   return;
      // }

      router.push(`/lunch/restaurant/add?hotpepperId=${hotpepper.id}`);
    },
    [router],
  );

  /**
   * 検索結果を初期表示にリセットする.
   */
  const clear = () => {
    setRestaurantsInDB([]);
    setHotpeppers([]);
    setHasClickedSearch(false);
    setSearchName("");
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <SubHeader title={"お店検索"} />
        <div className="max-w-screen-sm w-5/6 mx-auto py-5">
          <div className="flex flex-col gap-3 mb-5">
            <TextInput
              label={"店名"}
              value={searchName}
              type={"text"}
              fullWidth={true}
              required={true}
              onChange={inputRestaurantName}
              onKeyUp={searchInDB}
            />
            <Button label="店名で検索" onClick={searchByNameIn2km} />
          </div>
          {/* データベースに登録済みの店をオートコンプリートに表示する部分 */}
          {restautrantsInDB.length > 0 && (
            <>
              <p className="mb-5 font-bold">
                もしかしてこのお店？(登録済みのお店)
              </p>
              <ul>
                {restautrantsInDB.map((restautrant) => {
                  return (
                    <li key={restautrant.id} className="flex items-center mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className="cursor-pointer hover:text-text-brown hover:underline"
                        onClick={() =>
                          router.push(`/lunch/restaurant/${restautrant.id}`)
                        }
                      >
                        {restautrant.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {/* ホットペッパー検索結果表示 */}
          {hasClickedSearch &&
            (hotpeppers.length > 0 ? (
              <>
                <p className="my-5 font-bold">検索結果(Hotppepperより検索)</p>
                <ul>
                  {hotpeppers.map((hotpepper) => {
                    return (
                      <li key={hotpepper.id} className="flex items-center mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span
                          className="cursor-pointer hover:text-text-brown hover:underline"
                          onClick={() => selectRestaurant(hotpepper)}
                        >
                          {hotpepper.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="my-5 font-bold">
                  お目当てのお店が見つかりませんか？手入力でお店を登録しますか？
                </div>
                <div className="flex gap-2">
                  <Button
                    label="手入力で登録"
                    onClick={() => router.push("/lunch/restaurant/add")}
                  />
                  <Button
                    label="クリア"
                    onClick={clear}
                    backgroundColor="#f6f0ea"
                    color="#622d18"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-3 font-bold">
                  検索結果が見つかりませんでした。手入力でお店を登録しますか？
                </div>
                <div className="flex gap-2">
                  <Button
                    label="手入力で登録"
                    onClick={() => router.push("/lunch/restaurant/add")}
                  />
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantSearch;
