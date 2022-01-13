import { FC, memo } from "react";

/**
 * つぶやきを削除するボタン.
 */
export const TrashBtn: FC = memo((props) => {
  //APIによってURLを変えたいため、propsでURLを受け取る
  // const { url = "" } = props;

  /**
   * APIで投稿削除を行う.
   * @remarks APIによってURLを変えたいため、propsでURLを受け取る
   */
  // const trash = () => {
  //   console.log("URL" + url);
  // };

  /**
   * 仮のメソッド.(API完成したら削除)
   */
  const trash = () => {
    console.log("つぶやき削除");
  };

  return (
    <>
      <button type="button" className="pr-10" onClick={trash}>
        <i className="fas fa-trash-alt text-gray-500 hover:text-blue-500"></i>
      </button>
    </>
  );
});
