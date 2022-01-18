import { FC, memo, useCallback, useState } from "react";

type Props = {
  postId?: number;
};

/**
 * つぶやきをお気に入りに登録するボタン.
 */
export const FavoBtn: FC<Props> = memo((props) => {
  //お気に入り(いいね)対象の投稿番号
  const { postId = 0 } = props;

  const [isFavo, setIsFavo] = useState(false);

  /**
   * はいボタン押下で発動.
   */
  const favo = useCallback(async () => {
    if (!isFavo) {
      alert("投稿ID" + postId + "をいいねしました");
      setIsFavo(true);
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
    } else {
      setIsFavo(false);
    }
    //[]内入れないと変更が反映しないため挿入
  }, [isFavo, postId]);

  return (
    <>
      <button type="button" className="pr-10" onClick={favo}>
        {isFavo ? (
          <i className="fas fa-heart text-red-500"></i>
        ) : (
          <i className="fas fa-heart text-gray-500 hover:text-red-500"></i>
        )}
      </button>
    </>
  );
});
