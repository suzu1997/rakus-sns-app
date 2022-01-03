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
    {
      name: "山田太郎",
      tweet:
        "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほ",
      img: "/usakus.jpg",
    },
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
                  <td className="text-xl font-extrabold pt-3 pb-3">
                    {value.name}
                  </td>
                </tr>
                <tr>
                  <td className="pt-5 pb-5 pl-5 pr-60"> {value.tweet}</td>
                </tr>
                <tr>
                  <td className="text-right pr-20 pb-5">
                    <button type="button" className="pr-10">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button type="button">
                      <i className="fas fa-trash-alt"></i>
                    </button>
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
