import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useState } from "react";
import { JAVA_API_URL } from "../../utils/const";
import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restaurant: any;
  clear: () => void;
};

type Options = {
  id: string;
  name: string;
};

/**
 * ホットペッパーから店情報を取得して登録するコンポーネント.
 */
export const AddByHotpepper: FC<Props> = memo((props) => {
  const router = useRouter();

  const { restaurant, clear } = props;

  // 店舗のタイプの選択肢
  const typeOptions = [
    { id: "1", name: "店内" },
    { id: "2", name: "お弁当" },
    { id: "3", name: "両方" },
  ];

  // 登録する店舗のタイプ
  const [type, setType] = useState<Options>(typeOptions[0]);

  /**
   * 店舗を登録する.
   */
  const register = useCallback(
    async (restaurant) => {
      // 店の情報と入力させたタイプをAPIに渡して登録
      const res = await axios.post(`${JAVA_API_URL}/restaurant`, {
        name: restaurant.name,
        address: restaurant.address,
        genreFk: restaurant.genre.code,
        photoPath: restaurant.photo.pc.l,
        restaurantType: type.id,
        hotpepperId: restaurant.id,
        description: restaurant.catch,
        access: restaurant.access,
        latitude: restaurant.lat,
        longitude: restaurant.lng,
        url: restaurant.urls.pc,
        smoking: restaurant.non_smoking,
      });
      router.push(`/lunch/restaurant/${res.data.restaurant.id}`);
      alert("登録しました");
    },
    [router, type.id],
  );

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
          value={type.name}
          select={setType}
          options={typeOptions}
        ></SelectBox>
      </div>
      <div className="ml-10 mt-5 flex justify-center gap-3">
        <Button label="新規登録" onClick={() => register(restaurant)} />
        <Button
          label="クリア"
          onClick={clear}
          backgroundColor="#f6f0ea"
          color="#622d18"
        />
      </div>
    </div>
  );
});
