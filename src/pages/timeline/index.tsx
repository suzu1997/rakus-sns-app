import type { NextPage } from "next";
// import Link from "next/link";
// import { Button } from "../components/Button";
import Image from "next/image";

const Timeline: NextPage = () => {
  const style = {
    borderBottom: "solid 1px black",
  };

  return (
    <>
      <table>
        <tr style={style}>
          <td>
            <Image src="/usakus.jpg" width={50} height={50} alt="icon" />
          </td>
          <td>佐藤花子</td>
          <td>ああああああああああああ</td>
        </tr>
      </table>
    </>
  );
};

export default Timeline;
