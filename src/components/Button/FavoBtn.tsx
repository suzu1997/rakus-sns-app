import { FC, memo, useCallback, useContext } from "react";
import axios from "axios";

import { loginIdContext } from "../../providers/LoginIdProvider";
import { JAVA_API_URL } from "../../utils/const";

//一旦?にしているけれど必須にしていいかも
type Props = {
  postId?: number; //投稿ID
  favoCount?: number; //お気に入り数
  isFavo?: boolean; //お気に入りしているかどうか
  type?: string; //レビューかつぶやきか
  success?: () => void; //自動リロード用メソッド
};

/**
 * つぶやきをお気に入りに登録するボタン.(500エラー中)
 */
export const FavoBtn: FC<Props> = memo((props) => {
  //ログインID
  const {hash} = useContext(loginIdContext);

  //props
  const { postId, favoCount, isFavo, type, success } = props;

  /**
   * はいボタン押下でいいね発動.
   */
  const favo = useCallback(async () => {
    try {
      if (type === "タイムライン") {
        //タイムラインに対するいいね
        const res = await axios.post(`${JAVA_API_URL}/timeline/like`, {
          timelineId: postId, //投稿ID
          userLogicalId: hash, //ログインユーザID
        });
        if (res.data.status === "success") {
          //リロード
          if (success) {
            success();
          }
        }
      }

      if (type === "タイムラインコメント") {
        const res = await axios.post(`${JAVA_API_URL}/timeline/comment/like`, {
          commentId: postId, //投稿ID
          userLogicalId: hash, //ログインユーザID
        });
        if (res.data.status === "success") {
          //リロード
          if (success) {
            success();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    //[]内入れないと変更が反映しないため挿入
  }, [success, hash, postId, type]);

  return (
    <>
      <button type="button" className="pr-10 outline none" onClick={favo}>
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
