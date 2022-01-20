export type LunchReview = {
  reviewId: number;
  star: number;
  name: string;
  sentence: string;
  likeCount: number;
  commentCount: number;
  userId: string;
  accountName: string;
  userImg: string;
  restaurantId: number;
  restaurantName: string;
  restaurantImg: string;
  time?: Date;
};

export type Restaurant = {
  restaurantId: number;
  restaurantName: string;
  restaurantAddress: string;
  restaurantGenre: string;
  restaurantStar: number;
  restaurantType: number;
  restaurantImg: string;
  updatedTime: Date;
  postedTime: Date;
};
