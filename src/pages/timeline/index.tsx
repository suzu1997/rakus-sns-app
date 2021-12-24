import type { NextPage } from "next";
// import Link from "next/link";
// import { Button } from "../components/Button";
import Image from "next/image";
import { useState } from "react";

const Timeline: NextPage = () => {
  const [data] = useState([
    { name: "佐藤花子", tweet: "あああ", img: "/usakus.jpg" },
    { name: "山田太郎", tweet: "いいい", img: "/usakus.jpg" },
    { name: "ランチックス", tweet: "ううう", img: "/usakus.jpg" },
  ]);

  const style = {
    borderBottom: "solid 1px black",
  };

  return (
    <>
      <table>
        <tbody>
          {data.map((value, key) => (
            <tr style={style} key={key}>
              <td>
                <Image src={value.img} width={50} height={50} alt="icon" />
              </td>
              <td>{value.name}</td>
              <td>{value.tweet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Timeline;
