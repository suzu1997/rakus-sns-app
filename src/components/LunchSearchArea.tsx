import { FC, useState } from "react";
import { SelectBox } from "./SelectBox";

/**
 * ランチの並び替えと絞り込みを行うエリア.
 */
export const LunchSearchArea: FC = () => {
  const [order, setOrder] = useState("最新順");
  const [genre, setGenre] = useState("すべて");
  const [type, setType] = useState("すべて");

  return (
    <div className="bg-bgc w-full sm:w-96 p-5 rounded-lg">
      <div className="text-center">検索</div>
      <div className="flex flex-col gap-3">
        <SelectBox
          label="並び替え"
          options={[
            {
              id: "1",
              name: "最新順",
            },
            {
              id: "2",
              name: "評価順",
            },
          ]}
          value={order}
          select={setOrder}
        />
        <SelectBox
          label="ジャンル"
          options={[
            {
              id: "1",
              name: "すべて",
            },
            {
              id: "2",
              name: "中華",
            },
            {
              id: "3",
              name: "イタリアン",
            },
            {
              id: "4",
              name: "うどん",
            },
          ]}
          value={genre}
          select={setGenre}
        />
        <SelectBox
          label="タイプ"
          options={[
            {
              id: "1",
              name: "すべて",
            },
            {
              id: "2",
              name: "店内飲食",
            },
            {
              id: "3",
              name: "お弁当",
            },
          ]}
          value={type}
          select={setType}
        />
      </div>
    </div>
  );
};
