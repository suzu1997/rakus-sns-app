import { NextPage } from "next";
import { MenuBar } from "../../components/MenuBar";

const TweetDetail: NextPage = () => {
  return (
    <div className="flex">
      <MenuBar />
      つぶやき詳細ページ
    </div>
  );
};

export default TweetDetail;
