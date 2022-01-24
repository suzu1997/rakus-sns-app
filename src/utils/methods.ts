import { format } from "date-fns";

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