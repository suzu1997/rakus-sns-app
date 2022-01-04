import { NextPage } from "next";
import { MenuBar } from "../../components/MenuBar";

const Post: NextPage = () => {
  return (
    <div className="flex">
      <MenuBar />
      つぶやき投稿ページ
    </div>
  );
};

export default Post;
