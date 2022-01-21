import type { NextPage } from "next";
import { useCallback, useState } from "react";
import axios from "axios";
import { Button } from "../../components/Button/Button";
//緯度経度
import { GoogleMap } from "../../components/Lunch/GoogleMap";
//郵便番号検索
import { TextInput } from "../../components/Form/TextInput";
import { useGetAddress } from "../../hooks/getAddress";

const Test: NextPage = () => {
  //緯度経度変数
  const [latitudeData, setLatitudeData] = useState("");
  const [longitudeData, setLongitudeData] = useState("");
  //住所(下の郵便番号の変数と区別するためaddressじゃなくした)
  const [place, setPlace] = useState("");
  /**
   * 緯度経度API
   */
  const latitudeLongitude = useCallback(async () => {
    const url = "https://msearch.gsi.go.jp/address-search/AddressSearch?q=";

    //この変数に住所が入るようにする(下記の表記方法全て取得可能でした)
    // const place = "東京都中央区八重洲１丁目４丁目２２番地";//全角
    // const place = "東京都中央区八重洲1-4-22";//半角+ハイフン
    // const place = "東京都中央区八重洲１-４-２２";//全角+ハイフン
    // const place = "東京都中央区八重洲1丁目4丁目22番地"; //全角+ハイフン
    // const place =
    //   "東京都中央区八重洲1丁目4丁目22番地モリタニビルディング83 １Ｆ"; //ビル名とかも入れる
    const res = await axios.get(`${url}${place}`);
    //緯度
    const latitude = String(res.data[0].geometry.coordinates[1]);
    setLatitudeData(latitude + "0");
    //経度
    const longitude = String(res.data[0].geometry.coordinates[0]);
    setLongitudeData(longitude + "0");
  }, [place]);

  const inputPlace = useCallback((e) => {
    setPlace(e.target.value);
  }, []);

  /**
   * 郵便番号検索API.
   * @remarks addressに住所が入っている
   */
  //郵便番号入力用
  const [zipcode, setZipcode] = useState("");

  const inputZipcode = useCallback(
    (e) => {
      setZipcode(e.target.value);
    },
    [setZipcode],
  );
  const { getAddress, address, errorOfAddress } = useGetAddress(zipcode);

  return (
    <>
      {place}
      <p>緯度経度API</p>
      <TextInput
        value={place}
        label="住所"
        type="text"
        fullWidth={false}
        required={false}
        onChange={inputPlace}
      />
      <Button label="緯度経度" onClick={latitudeLongitude} />
      {latitudeData != "" && longitudeData != "" && (
        <GoogleMap latitude={latitudeData} longitude={longitudeData} />
      )}
      <p>郵便番号検索API</p>
      <div className="text-red-500">{errorOfAddress}</div>
      <TextInput
        value={zipcode}
        label="郵便番号"
        type="text"
        fullWidth={false}
        required={false}
        onChange={inputZipcode}
      />
      <Button label="郵便番号から住所を選択" onClick={getAddress} />
      <div>{address}</div>
    </>
  );
};

export default Test;
