import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import { JAVA_API_URL } from "../utils/const";

const LIMIT = 50; // 50件ずつ読み込む

/**
 * レストランのリストを取得するカスタムフック.
 * 
 * @param userId ログイン中のユーザーのハッシュ値
 * @returns
 * - data: データ
 * - isLast: 最後まで読み込んだかどうか
 * - error: エラー
 * - loadMoreReviews: 次のデータを読み込むメソッド
 */
export const useSWRRestaurant = () => {
  /**
   * 各ページのSWRのキーを取得する関数.
   *
   * @remarks
   * useSWRInfiniteからデータをフェッチする際に呼び出される。
   * @param pageIndex - ページインデックス
   * @param previousPageData - 前のページのデータ
   * @returns ページのキー
   */
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    // 最後まで読み込んだらnullを返す
    if (previousPageData && previousPageData.restaurant.length < LIMIT) return null;

    // 一番最初のフェッチ
    if (pageIndex === 0) return `${JAVA_API_URL}/restaurant`;

    // 一番古いレビューのIDを取得
    const id = previousPageData.restaurant[previousPageData.restaurant.length - 1].id;

    // 「過去のレビューを見る」ボタンを押したとき
    // 一番下の投稿IDをAPIに渡す
    return `${JAVA_API_URL}/restaurant/old/${id}`;
  };

  // data: データの連想配列の配列(※ページごとの配列)
  // error: エラーの場合、エラー情報が入る
  // size:  ページサイズ(ページが何ページあるのか※最初は1ページ)
  // setSize:  ページサイズ変更する際に使用する(ページ数を増やすと自動的にフェッチ処理が走る)
  // mutate: 再検証する際に使用する
  const { data, error, size, setSize, mutate } = useSWRInfinite(getKey);

  /**
   * レビューを追加読み込みする.
   *
   * @remarks
   * ページサイズを増やすことで、次のフェッチ処理を走らせる。
   */
  const loadMoreReviews = () => {
    setSize(size + 1);
  };

  // 最後まで読み込んだかどうか
  const isLast = data
    ? data.filter((pageData) => pageData.restaurant.length < LIMIT).length > 0
    : false;

  return { data, isLast, error, loadMoreReviews, restaurantMutate: mutate };
};
