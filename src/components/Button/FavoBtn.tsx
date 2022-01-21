import axios from "axios";
import { FC, memo, useCallback, useContext } from "react";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";

type Props = {
  postId?: number; //投稿ID
  favoCount?: number; //お気に入り数
  isFavo?: boolean; //お気に入りしているかどうか
  type?: string; //レビューかつぶやきか
};

/**
 * つぶやきをお気に入りに登録するボタン.
 */
export const FavoBtn: FC<Props> = memo((props) => {
  //ログインID
  const loginId = useContext(loginIdContext);

  //props
  const { postId = -1, favoCount, isFavo, type } = props;

  /**
   * はいボタン押下で発動.
   */
  const favo = useCallback(async () => {
    //送信データ
    const postData = {
      userId: Number(loginId), //ログインユーザID
      timelineId: Number(postId), //投稿ID
    };

    try {
      if (type === "タイムライン一覧の検索に成功しました") {
        console.log("これはタイムラインに対するいいね");
        const res = await axios.post(`${JAVA_API_URL}/timeline/like`, postData);
      } else {
        console.log("これはレビューに対するいいね");
      }
    } catch (error) {
      console.log(error);
    }

    //[]内入れないと変更が反映しないため挿入
  }, [loginId, postId, type]);

  return (
    <>
      <button type="button" className="pr-10" onClick={favo}>
        {isFavo ? (
          <>
            <i className="fas fa-heart text-red-500"></i>
            <span className="pl-1">{favoCount}</span>
          </>
        ) : (
          <>
            <i className="fas fa-heart text-gray-500 hover:text-red-500"></i>
            <span className="pl-1">{favoCount}</span>
          </>
        )}
      </button>
    </>
  );
});
