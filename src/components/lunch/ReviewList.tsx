import { FC, memo, useState } from "react";
import { ReviewCard } from "./ReviewCard";

export const ReviewList: FC = memo(() => {
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
          <ReviewCard {...review} type="一覧" />
        </div>
      ))}
    </div>
  );
});
