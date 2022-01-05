import Router from "next/router";
import { NextPage } from "next";
import { useState, useCallback } from "react";
import { Button } from "../../components/Button";
import { MenuBar } from "../../components/MenuBar";

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

  const style = { animation: "fadeIn 1s ease 0s 1 normal" };

  const backPage = () => {
    Router.push("/timeline");
  };

  return (
    <>
      <style>
        {`@keyframes fadeIn {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }
        100% {
          opacity: 100;
          transform: translateY(0px);
        }
      }`}
      </style>

      <div className="flex">
        <MenuBar />
        <div
          className="bg-bgc  ml-80 mt-20 h-80 w-96 rounded text-center"
          style={style}
        >
          <div className="mt-10">
            つぶやきたい内容を下記に入力して下さい。(140字以内)
          </div>

          <div>
            <form>
              <textarea
                value={tweet}
                onChange={inputTweet}
                rows={5}
                cols={28}
              ></textarea>
            </form>
            <div className="my-5">
              <Button
                label="つぶやく"
                size="md"
                onClick={() => {
                  alert("「" + tweet + "」が呟かれました");
                }}
              />
              <div className="mt-3">
                <Button label="キャンセル" size="md" onClick={backPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
