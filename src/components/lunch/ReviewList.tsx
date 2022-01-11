import { useRouter } from "next/router";
import { FC, memo, useEffect, useState } from "react";
import { ReviewCard } from "./ReviewCard";

export const ReviewList: FC = memo(() => {
  // レビューカードがレストラン情報を持つかどうか
  const [hasRestaurantInfo, setHasRestaurantInfo] = useState<boolean>(true);
  const router = useRouter();

  // pathにrestaurantが含まれている(店詳細ページにいる)場合はfalseにする
  // レビューページにいるときだけ店詳細ページへのリンクを付けたい
  useEffect(() => {
    const path = router.pathname;
    path.includes("restaurant");
    if (path.includes("restaurant")) {
      setHasRestaurantInfo(false);
    } else {
      setHasRestaurantInfo(true);
    }
  }, [router.pathname]);

  //テストデータ
  const [reviewData] = useState([
    {
      id: 1,
      name: "佐藤花子",
      content: "あああ",
      img: "/usakus.jpg",
      time: "00:00・0000/00/00",
      star: 4,
    },
    {
      id: 2,
      name: "山田太郎",
      content: "いいい",
      img: "/usakus.jpg",
      time: "00:00・0000/00/00",
      star: 3,
    },
    {
      id: 3,
      name: "ランチックス",
      content: "ううう",
      img: "/usakus.jpg",
      time: "00:00・0000/00/00",
      star: 5,
    },
    {
      id: 4,
      name: "佐藤花子",
      content: "あああ",
      img: "/usakus.jpg",
      time: "00:00・0000/00/00",
      star: 3,
    },
    {
      id: 5,
      name: "山田太郎",
      content:
        "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいい",
      img: "/usakus.jpg",
      time: "00:00・0000/00/00",
      star: 4,
    },
    {
      id: 6,
      name: "ランチックス",
      content: "ううう",
      img: "/usakus.jpg",
      time: "00:00・0000/00/00",
      star: 5,
    },
  ]);

  return (
    <div className="w-full">
      {reviewData.map((review) => (
        <div key={review.id}>
          <ReviewCard
            {...review}
            type="一覧"
            hasRestaurantInfo={hasRestaurantInfo}
          />
        </div>
      ))}
    </div>
  );
});
