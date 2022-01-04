import { NextPage } from "next";
import { useState, useCallback } from "react";
import { Button } from "../../components/Button";
import { MenuBar } from "../../components/MenuBar";
import { TextInput } from "../../components/TextInput";

/**
 * つぶやき投稿画面.
 * @returns つぶやき投稿画面
 */
const Post: NextPage = () => {
  //つぶやき内容を入れる変数
  const [tweet, setTweet] = useState<string>("");

  /**
   * つぶやき内容をtweetに代入するメソッド.
   */
  const inputTweet = useCallback(
    (e) => {
      setTweet(e.target.value);
    },
    [setTweet],
  );

  return (
    <div className="flex">
      <MenuBar />
      <div className="bg-bgc w-full h-96 rounded text-center">
        <div className="h-96">
          <TextInput
            label={"つぶやきたい内容を下記に入力(140字以内)"}
            value={tweet}
            type="text"
            fullWidth={true}
            required={false}
            onChange={inputTweet}
          />
        </div>
        <div className="mt-5">
          <Button
            label="つぶやく"
            size="md"
            onClick={() => {
              alert("「" + tweet + "」が呟かれました");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
