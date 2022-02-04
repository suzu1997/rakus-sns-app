import { FC, memo } from "react";

type Props = CommentHis & {
  type: string;
};

/**
 * いいねコメント履歴を表示するコンポーネント
 */
export const LikedCommentHis: FC<Props> = memo((props) => {
  const {
    id,
    userId,
    accountName,
    userPhotoPath,
    comment,
    commentLikeCount,
    actionedTime,
    myLike,
  } = props;

  //ログインID
  const { loginId } = useContext(loginIdContext);
  const { hash } = useContext(loginIdContext);

  //ルーターリンク
  const router = useRouter();
  /**
   * APIで初期表示用データ取得.
   */
  const { mutate } = useSWR(`${JAVA_API_URL}/user/${userId}/${hash}`);
  return (
    <div
      key={id}
      className=" border border-t-1 mt-1 border-blue-100text-sm font-medium leading-5 focus:outline-none rounded-xl bg-white relative p-3 "
    >
      <div
        className="hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
        onClick={() => {
          goDetailTimelinePage(id);
        }}
      >
        <span className="text-xl font-extrabold pt-3 pb-3">{accountName}</span>
        <span className="ml-7">
          つぶやき日時:
          {getFormattedDate(new Date(actionedTime))}
        </span>
      </div>
      <div className="flex">
        <span
          className="rounded-full  pt-5 cursor-pointer hover:opacity-50"
          onClick={() => {
            goUserPage(userId);
          }}
        >
          <Image
            src={`/image/userIcon/${userPhotoPath}`}
            width={100}
            height={100}
            alt="icon"
            className="rounded-full"
          />
        </span>
        <span
          className="p-10 w-8/12 hover:bg-coolGray-100 cursor-pointer hover:opacity-50"
          onClick={() => {
            goDetailTimelinePage(id);
          }}
        >
          {comment}
        </span>
      </div>
      <div className="w-full text-right py-3">
        <FavoBtn
          postId={id}
          favoCount={commentLikeCount}
          isFavo={myLike}
          type="タイムライン"
          success={updateData}
        />
        {Number(loginId) === userId && (
          <TrashBtn postId={id} type="タイムライン" success={updateData} />
        )}
      </div>
    </div>
  );
});
