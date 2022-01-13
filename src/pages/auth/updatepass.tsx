import { NextPage } from "next";
/**
 * パスワードを忘れたときの画面
 * @returns パスワードを忘れたときの画面
 */
const UpdatePass: NextPage = () => {
  return (
    <>
      <div className="border-solid  border-2 border-bgc-200 m-10  shadow-lg rounded-xl text-center">
        <div className="mt-10 ">
          以下のフォームよりパスワードの更新をお願いします
        </div>
      </div>
    </>
  );
};
export default UpdatePass;
