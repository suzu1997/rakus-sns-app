import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useState } from "react";
import useSWR from "swr";
import { JAVA_API_URL } from "../../utils/const";
import { typeOptions } from "../../utils/options";
import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";

type Props = {
  hotpepperId: string;
  cansel: () => void;
};

export type Option = {
  id: string;
  name: string;
};

/**
 * ホットペッパーから店情報を取得して登録するコンポーネント.
 *
 * @param hotpepperId 登録するホットペッパーのID
 * @param cansel 登録をキャンセルするためのコールバック関数
 */
export const AddByHotpepper: FC<Props> = memo((props) => {
  const router = useRouter();

  const { hotpepperId, cansel } = props;

  const { data, error } = useSWR(`/api/hotpepper?hotpepperId=${hotpepperId}`);

  // 登録する店舗のタイプ
  const [type, setType] = useState<Option>(typeOptions[0]);

  /**
   * APIに情報を渡して店舗を登録する.
   */
  const register = useCallback(
    async (restaurant) => {
      try {
        const res = await axios.post(`${JAVA_API_URL}/restaurant/hp`, {
          name: restaurant.name,
          address: restaurant.address,
          genreFk: restaurant.genre.code,
          photoPath: restaurant.photo.pc.l,
          type: Number(type.id),
          hotpepperId: restaurant.id,
          description: restaurant.catch,
          access: restaurant.access,
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          url: restaurant.urls.pc,
          smoking: restaurant.non_smoking,
        });
        // 店の情報と入力させたタイプをAPIに渡して登録
        router.push(`/lunch/restaurant/${res.data.restaurant.id}`);
      } catch (error) {
        alert(error);
      }
    },
    [router, type.id],
  );

  if (!error && !data) {
    return (
      <div className="flex justify-center pt-10 w-full">
        <div className="animate-spin h-8 w-8 bg-basic rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-10 text-center">
        データが取得できませんでした
      </div>
    );
  }

  // データから店舗情報を抽出
  const restaurant = data.shops[0];

  return (
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
      <p className="ml-10">▶︎ジャンル: {restaurant.genre.name}</p>
      <p className="ml-10 mt-2">▶︎お店キャッチ: {restaurant.catch}</p>
      <p className="ml-10 mt-2">▶︎住所: {restaurant.address}</p>
      <p className="ml-10 mt-2">▶︎交通アクセス: {restaurant.access}</p>
      <p className="ml-10 mt-2">
        ▶︎店舗URL:{" "}
        <a href={restaurant.urls.pc} className="hover:text-blue-700">
          {restaurant.urls.pc}
        </a>
      </p>
      <p className="ml-10 mt-2">▶︎禁煙席: {restaurant.non_smoking}</p>
      <div className="w-1/3 ml-10 mt-5">
        <SelectBox
          label="タイプ(店内・お弁当・両方)"
          selectedOption={type}
          select={setType}
          options={typeOptions}
        ></SelectBox>
      </div>
      <div className="ml-10 mt-5 flex justify-center gap-3">
        <Button label="新規登録" onClick={() => register(restaurant)} />
        <Button
          label="キャンセル"
          onClick={cansel}
          backgroundColor="#f6f0ea"
          color="#622d18"
        />
      </div>
    </div>
  );
});
