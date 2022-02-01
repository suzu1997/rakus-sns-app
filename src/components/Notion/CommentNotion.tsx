import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import type { notion } from "../../types/type";
import { returnCodeToBr } from "../../utils/methods";

export type Props = {
  notification: notion; //通知内容
  type: "つぶやき" | "レビュー" | "コメント"; //タイプ
  url: string; //投稿詳細URL
};

/**
 * コメント通知用コンポーネント.
 * @param props - props
 * @returns ユーザがコメントしてきた際の通知を表示
 */
export const CommentNotion: FC<Props> = (props) => {
  const { notification, type, url } = props;

  return (
    <>
      <div className="p-5 lg:ml-5">
        <div className="flex">
          <span className="text-3xl text-yellow-600 md:mt-14 mt-10">
            <i className="fas fa-comment"></i>
          </span>
          <span className="lg:ml-5 ml-3 mt-5 cursor-pointer hover:opacity-50">
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
          <div className="lg:text-xl text-base py-3 lg:ml-7 ml-3 cursor-pointer hover:opacity-50">
            <Link href={url}>
              <a>
                {notification.accountName}
                さんがあなたの{type}投稿にコメントしました
                <div className="text-base py-5 w-8/12 text-text-brown">
                  {returnCodeToBr(notification.comment)}
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
