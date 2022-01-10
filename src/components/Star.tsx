import { FC, memo, useCallback, useState } from "react";

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

  const makeStarArray = useCallback(() => {
    //星の配列を空に
    starArray.splice(0, starArray.length);

    //整数分(1の位の数字文)色付き星をpush
    for (let i = 1; mathNum >= i; i++) {
      starArray.push("fas fa-star");
    }

    //始めに受け取った数字が整数→残りは白星で埋める
    //始めに受け取った数字が少数→1つ半分の星で埋めて、残りは白星で埋める
    if (Number.isInteger(starCount)) {
      for (let i = 1; 5 - mathNum >= i; i++) {
        starArray.push("far fa-star");
      }
    } else {
      starArray.push("fas fa-star-half-alt");
      for (let i = 1; 4 - mathNum >= i; i++) {
        starArray.push("far fa-star");
      }
    }
  }, []);

  makeStarArray();

  return (
    <>
      {starArray.map((value, key) => (
        <span key={key} className="text-basic">
          <i className={value}></i>
        </span>
      ))}
      ({starCount})
    </>
  );
});
