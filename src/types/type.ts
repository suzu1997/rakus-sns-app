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

//ユーザ情報画面
export type UserInfo = {
  name: string;
  hireDate: string;
  serviceFk: string;
  accountName: string;
  birthDay: string;
  profile: string;
};

//ユーザ本登録画面
export type UserPreInfo = {
  name: string;
  email: string;
};

//パスワード変更画面
export type UpdatePassInfo = {
  email: string;
};
