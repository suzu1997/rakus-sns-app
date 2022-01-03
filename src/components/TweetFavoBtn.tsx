/**
 * つぶやきをお気に入りに登録するボタン.
 */
import { FC, memo } from "react";

const favo = () => {
  console.log("つぶやきお気に入り登録");
};

export const TweetFavoBtn: FC = memo(() => {
  return (
    <>
      <button type="button" className="pr-10" onClick={favo}>
        <i className="fas fa-heart text-gray-500 hover:text-red-500"></i>
      </button>
    </>
  );
});
