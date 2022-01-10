import { FC, memo, useState } from "react";

export type Props = {
  starCount: number;
};

export const Star: FC<Props> = memo((props) => {
  //受け取った星の数
  const { starCount } = props;
  //星の数の少数切捨て
  const [mathNum] = useState(Math.floor(starCount));
  //星を入れる配列
  const [starArray] = useState<string[]>([]);

  return <></>;
});
