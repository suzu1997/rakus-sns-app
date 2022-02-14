import { NextPage } from "next";

/**
 * 404ページ.
 * @returns 存在しないURL/削除済投稿が叩かれた際に開く
 */
const Error404Page: NextPage = () => {
  return (
    <div>
      <div>404 This page could not be found.</div>
      <div>ページが見つかりません</div>
      <div>下記の可能性があります</div>
      <ul>
        <li>存在しないURL</li>
        <li>情報が削除された</li>
        <li>情報が存在しない</li>
      </ul>
    </div>
  );
};

export default Error404Page;
