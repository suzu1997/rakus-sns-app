import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SelectBox } from "../../components/SelectBox";
import { TextInput } from "../../components/TextInput";

const Test: NextPage = () => {
  const options = [
    { id: "1", name: "Wade Cooper" },
    { id: "2", name: "Arlene Mccoy" },
    { id: "3", name: "Devon Webb" },
    { id: "4", name: "Tom Cook" },
    { id: "5", name: "Tanya Fox" },
    { id: "6", name: "Hellen Schmidt" },
  ];

  const [value, setValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>(options[0].name);

  const inputValue = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="font-mono text-red-700">テスト</p>
      <Link href="/">
        <a className="underline hover:text-blue-800 mt-3">トップへ戻る</a>
      </Link>
      {/* inputテスト */}
      <div className="w-96 flex gap-3">
        <TextInput
          label={"テスト"}
          value={value}
          type="text"
          fullWidth={false}
          required
          onChange={inputValue}
        />
        <TextInput
          label={"テスト"}
          value={value}
          type="text"
          fullWidth={false}
          required
          onChange={inputValue}
        />
      </div>
      <div className="w-96">
        <TextInput
          label={"テスト"}
          value={value}
          type="text"
          fullWidth={true}
          required
          onChange={inputValue}
        />
        <div className="w-60">
          <SelectBox
            label={"テスト"}
            value={selectValue}
            options={options}
            select={setSelectValue}
          />
        </div>
        <SelectBox
          label={"テスト"}
          value={selectValue}
          options={options}
          select={setSelectValue}
        />
      </div>
    </div>
  );
};

export default Test;
