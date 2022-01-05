import { NextPage } from "next";
import { MenuBar } from "../../components/MenuBar";

const Info: NextPage = () => {
  return (
    <>
      <div className="flex">
        <MenuBar />
        <h1>ラーセン内情報</h1>
      </div>
    </>
  );
};
export default Info;
