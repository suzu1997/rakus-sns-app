import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ReviewCard } from "../components/Lunch/ReviewCard";
import { action } from "@storybook/addon-actions";

export default {
  component: ReviewCard,
  // render: () => {
  //   return (
  //     <div className="max-w-xl w-5/6 mx-auto py-5">
  //       <AddManuallyForm cansel={action("cansel")} />
  //     </div>
  //   );
  // }
} as ComponentMeta<typeof ReviewCard>;

// 名前付きエクスポートはデフォルトでストーリーオブジェクトを表す
export const ListWithRestaurantLink: ComponentStoryObj<typeof ReviewCard> = {
  args: {
    accountName: "Suzu",
    userPhotoPath: "user3.jpeg",
    restaurantId: 1,
    restaurantName: "らーめん はやし田",
    restaurantPhotoPath: "https://imgfp.hotp.jp/IMGH/81/98/P038318198/P038318198_168.jpg",
    star: 4.5,
    sentence: "おいしかった！",
    likeCount: 30,
    commentCount: 5,
    postedTime: new Date("2022-01-21 22:31:29"),
    myLike: false,
    type: "一覧",
    hasRestaurantInfo: true,
  },
  storyName: "一覧(店舗情報あり)",
};

export const ListWithoutRestaurantLink: ComponentStoryObj<typeof ReviewCard> = {
  args: {
    accountName: "Suzu",
    userPhotoPath: "user3.jpeg",
    restaurantId: 1,
    restaurantName: "らーめん はやし田",
    restaurantPhotoPath: "https://imgfp.hotp.jp/IMGH/81/98/P038318198/P038318198_168.jpg",
    star: 2.5,
    sentence: "おいしかった！",
    likeCount: 30,
    commentCount: 5,
    postedTime: new Date("2022-01-21 22:31:29"),
    myLike: true,
    type: "一覧",
    hasRestaurantInfo: false,
  },
  storyName: "一覧(店舗情報なし)",
};

export const DetailWithRestaurantLink: ComponentStoryObj<typeof ReviewCard> = {
  args: {
    accountName: "Suzu",
    userPhotoPath: "user3.jpeg",
    restaurantId: 1,
    restaurantName: "らーめん はやし田",
    restaurantPhotoPath: "https://imgfp.hotp.jp/IMGH/81/98/P038318198/P038318198_168.jpg",
    star: 2.5,
    sentence: "おいしかった！",
    likeCount: 30,
    commentCount: 5,
    postedTime: new Date("2022-01-21 22:31:29"),
    myLike: false,
    type: "詳細",
    hasRestaurantInfo: true,
  },
  storyName: "詳細(店舗情報あり)",
};

export const DetailWithoutRestaurantLink: ComponentStoryObj<typeof ReviewCard> = {
  args: {
    accountName: "Suzu",
    userPhotoPath: "user3.jpeg",
    restaurantId: 1,
    restaurantName: "らーめん はやし田",
    restaurantPhotoPath: "https://imgfp.hotp.jp/IMGH/81/98/P038318198/P038318198_168.jpg",
    star: 2.5,
    sentence: "おいしかった！",
    likeCount: 30,
    commentCount: 5,
    postedTime: new Date("2022-01-21 22:31:29"),
    myLike: false,
    type: "詳細",
    hasRestaurantInfo: false,
  },
  storyName: "詳細(店舗情報なし)",
};
