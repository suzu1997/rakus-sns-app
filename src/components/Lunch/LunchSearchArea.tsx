import { FC, memo, useCallback, useState } from "react";

import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";
import { Option } from "../../types/type";
import { genreOptions, typeOptions } from "../../utils/options";

/**
 * ランチの並び替えと絞り込みを行うエリア.
 */
export const LunchSearchArea: FC = memo(() => {
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
  const searchGenreOptions = [
    {
      id: "all",
      name: "すべて",
    },
    ...genreOptions,
  ];
  // タイプ(店内かお弁当か)のオプション
  const searchTypeOptions = [
    {
      id: "all",
      name: "すべて",
    },
    ...typeOptions,
  ];

  // 選択中の並び替え
  const [order, setOrder] = useState<Option>(orderOptions[0]);
  // 選択中のジャンル
  const [genre, setGenre] = useState<Option>(searchGenreOptions[0]);
  // 選択中のタイプ
  const [type, setType] = useState<Option>(searchTypeOptions[0]);

  const search = useCallback(() => {
    alert("検索");
  }, []);

  return (
    <div className="w-5/6 md:w-96 p-5 rounded-lg">
      <div className="text-center">検索</div>
      <div className="flex flex-col gap-3">
        <SelectBox
          label="並び替え"
          options={orderOptions}
          selectedOption={order}
          select={setOrder}
          fullWidth={true}
        />
        <SelectBox
          label="ジャンル"
          options={searchGenreOptions}
          selectedOption={genre}
          select={setGenre}
          fullWidth={true}
        />
        <SelectBox
          label="タイプ"
          options={searchTypeOptions}
          selectedOption={type}
          select={setType}
          fullWidth={true}
        />
        <div className="text-center">
          <Button label="検索" onClick={search} />
        </div>
      </div>
    </div>
  );
});
