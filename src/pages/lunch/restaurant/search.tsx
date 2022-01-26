import { useCallback, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "../../../components/Button/Button";
import { TextInput } from "../../../components/Form/TextInput";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { Restaurant } from "../../../types/type";
import { JAVA_API_URL } from "../../../utils/const";
import { SearchResultInDB } from "../../../components/Lunch/SearchResultInDB";
import { HotpepperResult } from "../../../components/Lunch/HotpepperResult";

/**
 * お店を検索するページ.
 *
 * @returns お店を検索する画面
 */
const RestaurantSearch: NextPage = () => {
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
      toast.error("通信に失敗しました");
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
    try {
      const res = await axios.get(`/api/hotpepper?name_any=${searchName}`);
      setHotpeppers(res.data.shops);
      setHasClickedSearch(true);
    } catch (error) {
      toast.error("通信に失敗しました");
    }
  };

  /**
   * ホットペッパーからの検索結果から店を選択する.
   *
   * @param hotpepper - 選択した店の情報
   */
  const selectRestaurant = useCallback(
    async (hotpepper) => {
      // すでに登録されているホットペッパーIDかを確認し、登録済みなら詳細ページへ遷移
      try {
        const res = await axios.get(
          `${JAVA_API_URL}/restaurant/hp/${hotpepper.id}`,
        );
        if (res.data.status === "success") {
          router.push(`/lunch/restaurant/${res.data.restaurant.id}`);
          toast("登録済みの為、詳細ページへ遷移しました", {
            // Custom Icon
            icon: "ℹ️",
          });
          return;
        }
        // 未登録なら登録ページへ遷移
        router.push(`/lunch/restaurant/add?hotpepperId=${hotpepper.id}`);
      } catch (error) {
        toast.error("通信に失敗しました");
      }
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
    <>
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
          <SearchResultInDB restautrantsInDB={restautrantsInDB} />
        )}

        {/* ホットペッパー検索結果表示 */}
        {hasClickedSearch && (
          <HotpepperResult
            hotpeppers={hotpeppers}
            selectRestaurant={selectRestaurant}
            clear={clear}
          />
        )}
      </div>
    </>
  );
};

export default RestaurantSearch;
