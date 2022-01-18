import { FC, memo, useCallback } from "react";

type Props = {
  postId?: number;
};

/**
 * つぶやきをお気に入りに登録するボタン.
 */
export const FavoBtn: FC<Props> = memo((props) => {
  //お気に入り(いいね)対象の投稿番号
  const { postId = 0 } = props;

  /**
   * はいボタン押下で発動.
   */
  const favo = useCallback(async () => {
    alert("投稿ID" + postId + "をいいねしました");
    // try {
    //   const res = await axios.post("http://localhost:8080/signup");
    //   console.log(JSON.stringify(res.data));
    //   if (res.data.status === "success") {
    //     console.log(res.data.status);
    //     //成功→タイムラインページに戻る
    //     closeModal();
    //   } else {
    //     alert(res.data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  return (
    <>
      <button type="button" className="pr-10" onClick={favo}>
        <i className="fas fa-heart text-gray-500 hover:text-red-500"></i>
      </button>
    </>
  );
});
