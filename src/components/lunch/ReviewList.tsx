import { FC, useState } from "react";
import { ReviewCard } from "./ReviewCard";

export const ReviewList: FC = () => {
  //テストデータ
  const [reviewData] = useState([
    { id: 1, name: "佐藤花子", content: "あああ", img: "/usakus.jpg" },
    { id: 2, name: "山田太郎", content: "いいい", img: "/usakus.jpg" },
    { id: 3, name: "ランチックス", content: "ううう", img: "/usakus.jpg" },
    { id: 4, name: "佐藤花子", content: "あああ", img: "/usakus.jpg" },
    {
      id: 5,
      name: "山田太郎",
      content:
        "あああああああああああいいいいいいいいううううううううううえええええええええええええおおおおおおおおおおおおおおおうひうひひょひょほほほほほほほほほほほほほああああああああああああいいいいいいいいいいいいいいいいいいいいいいいいいいいいい",
      img: "/usakus.jpg",
    },
    { id: 6, name: "ランチックス", content: "ううう", img: "/usakus.jpg" },
  ]);

  return (
    <div className="w-full">
      {reviewData.map((review) => (
        <div key={review.id}>
          <ReviewCard {...review} />
        </div>
      ))}
    </div>
  );
};
