import Router from "next/router";
import Image from "next/image";
import { NextPage } from "next";
import { useState, useCallback, useEffect } from "react";
import { Button } from "../../components/Button";
import { MenuBar } from "../../components/MenuBar";

/**
 * つぶやき投稿画面.
 * @returns つぶやき投稿画面
 */
const Post: NextPage = () => {
  //モーダルアニメーション用
  const style = { animation: "fadeIn 1s ease 0s 1 normal" };
  //つぶやき内容を入れる変数
  const [tweet, setTweet] = useState<string>("");
  //つぶやきの文字数数える変数
  const [tweetLength, setTweetLength] = useState<number>(0);

  /**
   * つぶやき内容をtweetに代入するメソッド.
   */
  const inputTweet = useCallback(
    (e) => {
      setTweet(e.target.value);
    },
    [setTweet],
  );

  /**
   * ボタン押下でつぶやきを投稿する.
   * @remarks 1-140文字の時のみOK
   */
  const postTweet = () => {
    if (tweet === "") {
      alert("入力して下さい");
    } else if (tweet.length > 140) {
      alert("つぶやきは140文字以内にして下さい");
    } else {
      alert("「" + tweet + "」が呟かれました");
    }
  };

  /**
   * ボタン押下でタイムラインページに戻る.
   */
  const backPage = () => {
    Router.push("/timeline");
  };

  /**
   * リアルタイムにつぶやきの文字数をカウントしてくれる.
   */
  useEffect(() => {
    setTweetLength(140 - tweet.length);
  });

  return (
    <>
      {/* アニメ―ションCSS */}
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

      {/* メニューバー */}
      <div className="flex">
        <MenuBar />

        {/* つぶやき部分本体 */}
        <div
          className="bg-bgc  ml-80 mt-20 h-80 w-96 rounded text-center"
          style={style}
        >
          {/* ボタンゾーン */}
          <div className="my-5">
            <span>
              <Button label="つぶやく" size="md" onClick={postTweet} />
            </span>
            <span className="ml-3">
              <Button label="キャンセル" size="md" onClick={backPage} />
            </span>
          </div>
          {/* 画像＋テキストエリア */}
          <div className="mt-10">
            つぶやきたい内容を下記に入力して下さい。(140字以内)
          </div>
          <div className="flex mt-5">
            <div className="ml-5">
              <Image
                src="/usakus.jpg"
                width={100}
                height={100}
                alt="icon"
                className="rounded-full"
              />
            </div>
            <div className="mx-5">
              <form>
                <textarea
                  value={tweet}
                  onChange={inputTweet}
                  rows={5}
                  cols={28}
                ></textarea>
              </form>
            </div>
          </div>
          残り文字数：{tweetLength}
        </div>
      </div>
    </>
  );
};

export default Post;
