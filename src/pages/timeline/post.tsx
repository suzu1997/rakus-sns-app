import { NextPage } from "next";
import { useState, useCallback } from "react";
//ボタン
import { Button } from "../../components/Button";
//メニューバー
import { MenuBar } from "../../components/MenuBar";
//テキストボックス
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
      <div className="bg-bgc w-full h-96 rounded">
        <div className="w-3/6">
          <TextInput
            label={"つぶやきたい内容を下記に入力"}
            value={tweet}
            type="text"
            fullWidth={false}
            required={false}
            onChange={inputTweet}
          />
        </div>
        <Button
          label="つぶやく"
          size="md"
          onClick={() => {
            alert("「" + tweet + "」が呟かれました");
          }}
        />
      </div>
    </div>
  );
};

export default Post;
