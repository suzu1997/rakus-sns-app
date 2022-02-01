import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { notion } from "../../types/type";
import Image from "next/image";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  notification: notion;
  type: string;
  sentence: string | null;
};

export const LikeNotion: FC<Props> = (props) => {
  const { notification, type, sentence } = props;

  //1人1人のつぶやきの下に入る線
  const style = {
    borderBottom: "solid 1px black",
  };

  //いいねを表示
  return (
    <>
      <div className="p-5 ml-10" style={style}>
        <Link href={`/user/${notification.userId}`}>
          <a>
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
              {notification.accountName}
              さんがあなたの{type}投稿にいいねしました
              <div className="py-5 w-8/12 opacity-60">{sentence}</div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};
