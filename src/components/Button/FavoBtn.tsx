import { FC, memo } from "react";

/**
 * つぶやきをお気に入りに登録するボタン.
 */
export const FavoBtn: FC = memo((props) => {
  //APIによってURLを変えたいため、propsでURLを受け取る
  // const { url = "" } = props;

  /**
   * APIでお気に入り登録を行う.
   * @remarks APIによってURLを変えたいため、propsでURLを受け取る
   */
  // const favo = () => {
  //   console.log("URL" + url);
  // };

  /**
   * 仮のメソッド.(API完成したら削除)
   */
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
