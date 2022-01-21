import axios from "axios";
import { FC, memo, useCallback, useContext } from "react";
import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";

type Props = {
  postId?: number; //投稿ID
  favoCount?: number; //お気に入り数
  isFavo?: boolean; //お気に入りしているかどうか
};

/**
 * つぶやきをお気に入りに登録するボタン.
 */
export const FavoBtn: FC<Props> = memo((props) => {
  //ログインID
  const loginId = useContext(loginIdContext);

  //props
  const { postId = -1, favoCount, isFavo } = props;

  /**
   * はいボタン押下で発動.
   */
  const favo = useCallback(async () => {
    const postData = {
      userId: Number(loginId), //ログインユーザID
      timelineId: Number(postId), //投稿ID
    };

    try {
      const res = await axios.post(`${JAVA_API_URL}/timeline/like`, postData);
    } catch (error) {
      console.log(error);
    }

    //[]内入れないと変更が反映しないため挿入
  }, [isFavo, postId]);

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
