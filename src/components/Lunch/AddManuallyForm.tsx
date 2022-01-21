import { FC, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";
import { SelectBox } from "../Form/SelectBox";
import { TextArea } from "../Form/TextArea";
import { TextInput } from "../Form/TextInput";
import axios from "axios";
import { JAVA_API_URL } from "../../utils/const";
import { useRouter } from "next/router";
import { genreOptions, typeOptions } from "../../utils/options";

type Props = {
  cansel: () => void;
};

//バリデーションチェック
const schema = yup.object().shape({
  // 店名のバリデーション
  name: yup
    .string()
    .required("店名を入力してください")
    .max(255, "店名は255文字以内で入力してください"),
  // 住所のバリデーション
  address: yup.string().required("住所を入力してください"),
  description: yup.string().max(140, "140文字以内で入力してください"),
  url: yup.string().url("URL形式で入力してください"),
});

/**
 * 手入力で店を追加するフォーム.
 *
 * @param cansel 登録をキャンセルするためのコールバック関数
 */
export const AddManuallyForm: FC<Props> = (props) => {
  const router = useRouter();

  const { cansel } = props;

  // バリデーション機能を呼び出し
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [genre, setGenre] = useState(genreOptions[0].name);

  const [type, setType] = useState(typeOptions[0].name);

  //登録ボタンを押した時のメソッド
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const res = await axios.post(`${JAVA_API_URL}/restaurant`, {
        name: data.name,
        address: data.address,
        genreFk: "G001",
        type: 1,
        description: data.description,
        url: data.url,
      });
      //登録に成功した場合
      if (res.data.status === "success") {
        //登録と同時に入力内容をクリア
        reset();
        //登録した店の詳細画面に遷移する;
        router.push(`/lunch/restaurant/${res.data.restaurant.id}`);
      } else {
        //ログインに失敗した場合、エラーメッセージアラートを表示
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-3xl text-text-brown my-5 font-bold ">
        お店登録フォーム
      </div>

      <div className="flex flex-col gap-5">
        {/* 店名のテキストフォーム */}
        <TextInput
          label="店名"
          type="text"
          fullWidth={true}
          required
          errorMessage={errors.name?.message}
          placeholder="店名"
          registers={register("name")}
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
            value={type}
            select={setType}
            options={typeOptions}
          />
        </div>
        {/* 住所のテキストフォーム */}
        <TextInput
          label="住所"
          type="text"
          fullWidth={true}
          required
          errorMessage={errors.address?.message}
          placeholder="住所"
          registers={register("address")}
        />
        {/* 店の説明のテキストエリア */}
        <TextArea
          label="店の説明(140字以内)"
          errorMessage={errors.description?.message}
          placeholder="よかったらどんなお店か教えてください"
          rows={8}
          cols={15}
          registers={register("description")}
        />
        <TextInput
          label="参考URL"
          type="text"
          fullWidth={true}
          required={false}
          errorMessage={errors.url?.message}
          placeholder="参考URL"
          registers={register("url")}
        />
        <div className="ml-10 mt-5 flex justify-center gap-3">
          <Button label="新規登録" onClick={handleSubmit(onSubmit)} />
          <Button
            label="キャンセル"
            onClick={cansel}
            backgroundColor="#f6f0ea"
            color="#622d18"
          />
        </div>
      </div>
    </>
  );
};
