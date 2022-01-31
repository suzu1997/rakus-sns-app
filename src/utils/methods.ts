import { format } from "date-fns";
import HTMLReactParser from "html-react-parser";

/**
 * 日時データをフォーマットして返すメソッド.
 * 
 * @param date - フォーマットしたい日時データ
 * @returns "YYYY/MM/DD HH:mm"の形でフォーマットされた日時
 */
export const getFormattedDate = (date: Date) => {
  const formattedDate = format(date, "yyyy/MM/dd HH:mm");

  return formattedDate;
};

/**
   * テキストをHTMLに変換するメソッド.
   *
   * @remarks
   * 改行はbrタグに変換する。
   *
   * @param text - HTMLに変換するテキスト
   * @returns textが空文字列の場合は空文字列。そうでなければHTMLに変換した文字列。
   */
 export const returnCodeToBr = (text: string) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br />"));
  }
};

/**
   * レストラン画像のパスを取得するメソッド.
   * @remarks
   * photoPathに"hotp"が含まれていれば、ホットペッパー画像のパスをそのまま返す。含まれていなければ、publicフォルダ内の画像までのパスを返す。
   * @returns 表示するレストラン画像のパス
   */
export const getRestaurantPhotoPath = (photoPath: string) => {
  if (photoPath.includes("hotp")) {
    return photoPath;
  } else {
    return `/image/foodPhoto/${photoPath}`;
  }
};