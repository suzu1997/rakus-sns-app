import { FC } from "react";
import Link from "next/link";
import { notion } from "../../types/type";
import Image from "next/image";

//コメント数・対象の投稿IDを受け取る
export type Props = {
  notificationList: Array<notion>;
};

export const CommentNotion: FC<Props> = (props) => {
  const { notificationList } = props;

  //1人1人のつぶやきの下に入る線
  const style = {
    borderBottom: "solid 1px black",
  };

  //コメント→いいねを表示
  return (
    <>
      {notificationList.map((value, key) => (
        <div style={style} key={key} className="p-5 ml-10">
          <Link href={`/user/${value.id}`}>
            <a>
              <div className="flex">
                <span className="text-2xl text-red-500 mt-10">
                  <i className="fas fa-heart"></i>
                </span>
                <span className="ml-3 cursor-pointer hover:opacity-50">
                  <Link href={`/user/${value.userId}`}>
                    <a>
                      <Image
                        src={`/image/userIcon/${value.userPhotoPath}`}
                        width={100}
                        height={100}
                        alt="icon"
                        className="rounded-full"
                      />
                    </a>
                  </Link>
                </span>
              </div>
              <div className=" cursor-pointer hover:opacity-50">
                <div className="text-xl pt-3 pb-3 ml-16">
                  <>
                    {value.accountName}さんがあなたのコメントにいいねしました
                    <div className="pt-5 pb-5 pl-5 w-8/12 ml-20 text-text-brown">
                      {value.parentCommentSentence}
                    </div>
                  </>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};
