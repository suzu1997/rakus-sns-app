import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SelectBox } from "../../components/Form/SelectBox";
import { TextInput } from "../../components/Form/TextInput";
import Cookie from "universal-cookie";
import axios from "axios";
import { Button } from "../../components/Button/Button";
import { GoogleMap } from "../../components/Lunch/GoogleMap";

const Test: NextPage = () => {
  const [latitudeData, setLatitudeData] = useState("");
  const [longitudeData, setLongitudeData] = useState("");

  /**
   * 緯度経度API
   */
  const latitudeLongitude = useCallback(async () => {
    const url = "https://msearch.gsi.go.jp/address-search/AddressSearch?q=";
    //この変数に住所が入るようにする
    // const address = "北海道札幌市北区北６条西４丁目";
    const address = "東京都中央区八重洲１丁目４丁目２２番地";
    const res = await axios.get(`${url}${address}`);
    //緯度
    const latitude = String(res.data[0].geometry.coordinates[1]);
    console.dir("緯度" + latitude + "0");
    setLatitudeData(latitude + "0");
    //経度
    const longitude = String(res.data[0].geometry.coordinates[0]);
    setLongitudeData(longitude + "0");
    console.dir("経度" + longitude + "0");
  }, []);

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
      <Button label="緯度経度" onClick={latitudeLongitude} />
      {latitudeData != "" && longitudeData != "" && (
        <GoogleMap latitude={latitudeData} longitude={longitudeData} />
      )}
      <GoogleMap latitude="35.6816166" longitude="139.7676585" />

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
