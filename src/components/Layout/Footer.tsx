import { memo, FC } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * footer.
 */
export const Footer: FC = memo(() => {
  return (
    // <footer className="h-12 w-full shadow-md bg-basic text-sm text-gray-600 flex justify-center items-center">
    <footer className="h-20 w-full shadow-md bg-basic text-sm text-gray-600 text-center">
      <div className="py-3">©lunchkus</div>
      <div className="flex justify-center">
        <div className="mr-3">
          <Link href="https://www.pakutaso.com/">
            <a>
              <Image
                src="/image/pakutaso_logo2018.png"
                width={63}
                height={13}
                alt="pakutaso_logo"
              ></Image>
            </a>
          </Link>
        </div>
        <div className="ml-3">
          Powered by
          <Link href="http://webservice.recruit.co.jp/">
            <a>ホットペッパー Webサービス</a>
          </Link>
        </div>
      </div>
    </footer>
  );
});
