import { FC, useEffect } from "react";
import Link from "next/link";
import { notion } from "../../types/type";
import Image from "next/image";
import { CommentNotion } from "./CommentNotion";
import { LikeNotion } from "./LikeNotion";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  notification: notion;
};

export const TimelineNotion: FC<Props> = (props) => {
  const { notification } = props;

  //1人1人のつぶやきの下に入る線
  const style = {
    borderBottom: "solid 1px black",
  };

  //タイムライン→コメント／いいねを表示
  return (
    <>
      {notification.like && (
        <LikeNotion
          notification={notification}
          type="タイムライン"
          sentence={notification.timelineSentence}
        />
      )}
      {notification.comment && (
        <CommentNotion notification={notification} type="タイムライン" />
      )}
    </>
  );
};
