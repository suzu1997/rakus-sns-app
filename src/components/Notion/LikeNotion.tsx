import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import type { notion } from "../../types/type";
import { returnCodeToBr } from "../../utils/methods";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  notification: notion; //通知内容
  type: "つぶやき" | "レビュー" | "コメント"; //タイプ
  sentence: string; //ユーザが反応した投稿の内容
  url: string; //投稿詳細URL
};

/**
 * いいね通知用コンポーネント.
 * @param props - props
 * @returns ユーザがいいねしてきた際の通知を表示
 */
export const LikeNotion: FC<Props> = (props) => {
  const { notification, type, sentence, url } = props;

  //いいねを表示
  return (
    <>
      <div className="p-5 ml-10">
        <div className="flex">
          <span className="text-3xl text-red-500">
            <i className="fas fa-heart"></i>
          </span>

          <span className="ml-3 cursor-pointer hover:opacity-50">
            <Link href={`/user/${notification.userId}`}>
              <a>
                <Image
                  src={`/image/userIcon/${notification.userPhotoPath}`}
                  width={50}
                  height={50}
                  alt="icon"
                  className="rounded-full"
                />
              </a>
            </Link>
          </span>
        </div>
        <div className="text-xl pt-3 pb-3 ml-16 cursor-pointer hover:opacity-50">
          <Link href={url}>
            <a>
              {notification.accountName}
              さんがあなたの{type}投稿にいいねしました
              <div className="text-base py-5 w-8/12 opacity-60">
                {returnCodeToBr(sentence)}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
