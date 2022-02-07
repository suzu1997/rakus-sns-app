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
export const Default: ComponentStoryObj<typeof ReviewCard> = {
  args: {
    accountName: "Suzu",
    userPhotoPath: "user3.jpeg",
    restaurantId: 1,
    restaurantName: "らーめん はやし田",
    restaurantPhotoPath: "/restaurant1.jpg",
    star: 4.5,
    sentence: "鴨と大山鶏の奥深いスープ「はやし田」",
    likeCount: 30,
    commentCount: 5,
    postedTime: new Date("2022-01-21 22:31:29"),
    myLike: false,
    type: "一覧",
    hasRestaurantInfo: true,
  },
  // storyName: "デフォルト",
};
