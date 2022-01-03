/**
 * タイムラインページ.
 */
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { MenuBar } from "../../components/MenuBar";
import { SubHeader } from "../../components/SubHeader";

//テストデータ
const Timeline: NextPage = () => {
  const [data] = useState([
    { name: "佐藤花子", tweet: "あああ", img: "/usakus.jpg" },
    { name: "山田太郎", tweet: "いいい", img: "/usakus.jpg" },
    { name: "ランチックス", tweet: "ううう", img: "/usakus.jpg" },
    { name: "佐藤花子", tweet: "あああ", img: "/usakus.jpg" },
    { name: "山田太郎", tweet: "いいい", img: "/usakus.jpg" },
    { name: "ランチックス", tweet: "ううう", img: "/usakus.jpg" },
  ]);

  //1人1人のつぶやきの下に入る線がどうしてもtailwindで上手くいかなかった
  const style = {
    borderBottom: "solid 1px black",
  };

  //HTMLコーナー
  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>

        <div className="w-10/12">
          <SubHeader title="つぶやき" />
          <table className="w-full">
            {data.map((value, key) => (
              <tbody style={style} key={key}>
                <tr>
                  <td rowSpan={3} className="pl-6 pr-0 w-36">
                    <Image
                      src={value.img}
                      width={100}
                      height={100}
                      alt="icon"
                    />
                  </td>
                  <td className="text-xl font-extrabold">{value.name}</td>
                </tr>
                <tr>
                  <td> {value.tweet}</td>
                </tr>
                <tr>
                  <td>
                    <button type="button">♡</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Timeline;
