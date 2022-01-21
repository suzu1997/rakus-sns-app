import axios from "axios";
import { useState } from "react";

export const useGetAddress = (zipcode: string) => {
  const [address, setAddress] = useState("");
  const [errorOfAddress, setErrorOfAddress] = useState("");
  /**
   * 郵便番号から住所を取得.
   */
  const getAddress = async () => {
    //初期値リセット(住所、住所エラー)
    setAddress("");
    setErrorOfAddress("");
    //郵便番号から住所を取得APIに郵便番号を送る
    try {
      // const axios = require("axios");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axiosJsonpAdapter = require("axios-jsonp");

      const response = await axios.get("https://zipcoda.net/api", {
        adapter: axiosJsonpAdapter,
        params: {
          zipcode: zipcode,
        },
      });
      //成功したら住所に取得したデータを代入
      if (response.data.length === 1) {
        const data =
          response.data.items[0].state_name + response.data.items[0].address;
        setAddress(String(data));
        //失敗したらエラーを出す
      } else {
        setErrorOfAddress("住所が見つかりません");
      }
    } catch (e) {
      setErrorOfAddress("住所が見つかりません");
    }
  };
  return { getAddress, address, errorOfAddress };
};
