import { memo, FC, useState } from "react";

export type Props = {
  latitude: string; //緯度
  longitude: string; //経度
};

/**
 * Googleマップコンポーネント.
 * @remarks 緯度と経度をstring型で渡してあげてください
 */
export const GoogleMap: FC<Props> = memo((props) => {
  //初期設定のスタイルなので、CSSレストランページに合わせて修正して下さい
  const style = {
    frameborder: "0",
    scrolling: "no",
    marginheight: "0",
    marginwidth: "0",
    width: "600",
    height: "450",
  };

  const {
    latitude, //緯度
    longitude, //経度
  } = props;

  const [url] = useState(
    `http://maps.google.co.jp/maps?q=${latitude},${longitude}&output=embed&t=m&z=16&hl=ja`,
  );

  return (
    <>
      <div style={style}>
        <iframe src={url}></iframe>
      </div>
    </>
  );
});
