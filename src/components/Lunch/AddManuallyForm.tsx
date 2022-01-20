import { FC, useCallback, useState } from "react";
import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";
import { TextArea } from "../Form/TextArea";
import { TextInput } from "../Form/TextInput";

/**
 * 手入力で店を追加するフォーム.
 */
export const AddManuallyForm: FC = () => {
  const genreOptions = [
    { id: "1", name: "和食" },
    { id: "2", name: "洋食" },
    { id: "3", name: "ラーメン" },
  ];

  const [genre, setGenre] = useState(genreOptions[0].name);

  const register  = useCallback(async () => {
    alert("登録");
    return;
  },[]);

  const clear = useCallback(() => {
    alert("くりあ");
    return;
  },[]);

  return (
    <div>
      <div>手入力で登録</div>
      {/* <TextInput label={} type={} fullWidth, required /> */}

      {/* 店名のテキストフォーム */}
      <TextInput
        label="店名"
        type="text"
        fullWidth={true}
        required
        // errorMessage={errors.accountName?.message}
        placeholder="店名"
        // registers={register("accountName")}
      />
      {/* ジャンルのセレクトボックス */}
      <div className="flex gap-1">
        <SelectBox
          label="ジャンル"
          value={genre}
          select={setGenre}
          options={genreOptions}
        />
        {/* タイプのセレクトボックス */}
        <SelectBox
          label="タイプ"
          value={genre}
          select={setGenre}
          options={genreOptions}
        />
      </div>
      {/* 住所のテキストフォーム */}
      <TextInput
        label="住所"
        type="text"
        fullWidth={true}
        required
        // errorMessage={errors.accountName?.message}
        placeholder="住所"
        // registers={register("accountName")}
      />
      {/* 店の説明のテキストエリア */}
      <TextArea
        label="店の説明"
        // errorMessage={errors.accountName?.message}
        placeholder="よかったらどんなお店か教えてください"
        rows={8}
        cols={15}
        // registers={register("accountName")}
      />
      <TextInput
        label="参考URL"
        type="text"
        fullWidth={true}
        required={false}
        // errorMessage={errors.accountName?.message}
        placeholder="参考URL"
        // registers={register("accountName")}
      />
      <div className="ml-10 mt-5 flex justify-center gap-3">
        <Button label="新規登録" onClick={register} />
        <Button
          label="キャンセル"
          onClick={clear}
          backgroundColor="#f6f0ea"
          color="#622d18"
        />
      </div>
    </div>
  );
};
