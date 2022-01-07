import { FC, memo } from "react";

/**
 * つぶやきをお気に入りに登録するボタン.
 */
export const TweetFavoBtn: FC = memo((props) => {
  // const { url = "" } = props;

  // const favo = () => {
  //   console.log("URL" + url);
  // };

  const favo = () => {
    console.log("お気に入り登録");
  };

  return (
    <>
      <button type="button" className="pr-10" onClick={favo}>
        <i className="fas fa-heart text-gray-500 hover:text-red-500"></i>
      </button>
    </>
  );
});
