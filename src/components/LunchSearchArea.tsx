import { FC, useState } from "react";
import { SelectBox } from "./SelectBox";

/**
 * ランチの並び替えと絞り込みを行うエリア.
 */
export const LunchSearchArea: FC = () => {
  // 並び替えのオプション
  const orderOptions = [
    {
      id: "1",
      name: "最新順",
    },
    {
      id: "2",
      name: "評価順",
    },
  ];
  // ランチのジャンルのオプション
  const genreOptions = [
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
  ];
  // タイプ(店内かお弁当か)のオプション
  const typeOptions = [
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
  ];
  // 選択中の並び替え
  const [order, setOrder] = useState(orderOptions[0].name);
   // 選択中のジャンル
  const [genre, setGenre] = useState(genreOptions[0].name);
  // 選択中のタイプ
  const [type, setType] = useState(typeOptions[0].name);

  return (
    <div className="bg-bgc w-full sm:w-96 p-5 rounded-lg">
      <div className="text-center">検索</div>
      <div className="flex flex-col gap-3">
        <SelectBox
          label="並び替え"
          options={orderOptions}
          value={order}
          select={setOrder}
        />
        <SelectBox
          label="ジャンル"
          options={genreOptions}
          value={genre}
          select={setGenre}
        />
        <SelectBox
          label="タイプ"
          options={typeOptions}
          value={type}
          select={setType}
        />
      </div>
    </div>
  );
};