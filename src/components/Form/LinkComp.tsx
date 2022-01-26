import { FC } from "react";
import Link from "next/link";

export type Props = {
  linkText: string;
  url: string;
  firstText?: string;
  lastText?: string;
};

export const LinkComp: FC<Props> = (props) => {
  const { linkText, url, firstText, lastText } = props;
  return (
    <>
      <div>
        {firstText}
        <Link href={url}>
          <a className="underline hover:text-blue-800 mt-3">{linkText}</a>
        </Link>
        {lastText}
      </div>
    </>
  );
};
