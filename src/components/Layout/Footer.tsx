import { memo, FC } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * footer.
 */
export const Footer: FC = memo(() => {
  return (
    <footer className="h-12 w-full shadow-md bg-basic text-sm text-gray-600 flex justify-center items-center">
      <div>©lunchkus</div>
      <div>
        Powered by
        <Link href="http://webservice.recruit.co.jp/">
          <a>ホットペッパー Webサービス</a>
        </Link>
      </div>
    </footer>
  );
});
