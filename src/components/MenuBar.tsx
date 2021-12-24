import { FC, memo } from "react";
import Link from "next/link";

export const MenuBar: FC = memo(() => {
  return (
    <>
      <ul>
        <li>
          <Link href="/aaa/test">HOME</Link>
        </li>
        <li>
          <Link href="/aaa/test">プロフィール</Link>
        </li>
        <li>
          <Link href="/aaa/test">ランチ</Link>
        </li>
        <li>
          <Link href="/aaa/test">通知</Link>
        </li>
        <li>
          <Link href="/aaa/test">ラーセン内情報</Link>
        </li>
        <li>
          <Link href="/aaa/test">ログアウト</Link>
        </li>
      </ul>
    </>
  );
});
