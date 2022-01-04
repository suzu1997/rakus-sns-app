import { FC, memo } from "react";

const trash = () => {
  console.log("つぶやき削除");
};

/**
 * つぶやきを削除するボタン.
 */
export const TweetTrashBtn: FC = memo(() => {
  return (
    <>
      <button type="button" className="pr-10" onClick={trash}>
        <i className="fas fa-trash-alt text-gray-500 hover:text-blue-500"></i>
      </button>
    </>
  );
});
