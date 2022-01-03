import type { NextPage } from "next";
// import Link from "next/link";
// import { Button } from "../components/Button";
import Image from "next/image";
import { useState } from "react";
import { MenuBar } from "../../components/MenuBar";

const Timeline: NextPage = () => {
  const [data] = useState([
    { name: "佐藤花子", tweet: "あああ", img: "/usakus.jpg" },
    { name: "山田太郎", tweet: "いいい", img: "/usakus.jpg" },
    { name: "ランチックス", tweet: "ううう", img: "/usakus.jpg" },
    { name: "佐藤花子", tweet: "あああ", img: "/usakus.jpg" },
    { name: "山田太郎", tweet: "いいい", img: "/usakus.jpg" },
    { name: "ランチックス", tweet: "ううう", img: "/usakus.jpg" },
  ]);

  const style = {
    borderBottom: "solid 1px black",
  };

  return (
    <>
      <div className="flex">
        <MenuBar></MenuBar>
        <div className="w-10/12">
          <div className="bg-bgc h-20 text-center pt-7 font-black">
            タイムライン
          </div>
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
