import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { notion } from "../../types/type";
import Image from "next/image";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  notification: notion;
};

export const CommentNotion: FC<Props> = (props) => {
  const { notification } = props;

  const [type, setType] = useState("");

  useEffect(() => {
    if (notification.timelineId != null) {
      setType("タイムライン");
    } else if (notification.reviewId != null) {
      setType("レビュー");
    } else {
      setType("コメント");
    }
  }, [notification.reviewId, notification.timelineId]);

  //1人1人のつぶやきの下に入る線
  const style = {
    borderBottom: "solid 1px black",
  };

  //コメントを表示
  return (
    <>
      <div className="p-5 ml-10" style={style}>
        <Link href={`/user/${notification.id}`}>
          <a>
            <div className="flex">
              <span className="text-3xl text-yellow-600 mt-10">
                <i className="fas fa-comment"></i>
              </span>

              <span className="ml-3 cursor-pointer hover:opacity-50">
                <Link href={`/user/${notification.userId}`}>
                  <a>
                    <Image
                      src={`/image/userIcon/${notification.userPhotoPath}`}
                      width={100}
                      height={100}
                      alt="icon"
                      className="rounded-full"
                    />
                  </a>
                </Link>
              </span>
              <div className="text-xl pt-3 pb-3 ml-16 cursor-pointer hover:opacity-50">
                {notification.accountName}
                さんがあなたの{type}投稿にコメントしました
                <div className="py-5 w-8/12 ml-5 text-text-brown">
                  {notification.comment}
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};
