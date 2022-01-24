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
  id: number;
  name: string;
  address: string;
  genreFk: string;
  genreValue: string;
  star: number;
  type: 1 | 2 | 3;
  photoPath: string;
  hotpepperId: string;
  description: string;
  access: string;
  latitude: string;
  longitude: string;
  url: string;
  smoking: string;
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

//タイムライン
export type Timeline = [
  {
    id: number;
    userId: number;
    accountName: string;
    userPhotoPath: string;
    sentence: string;
    likeCount: number;
    commentCount: number;
    updatedTime: string;
    postedTime: string;
    deleted: boolean;
    myLike: boolean;
  },
];

//つぶやき詳細画面
export type TimelineDetail = {
  id: number;
  userId: number;
  accountName: string;
  userPhotoPath: string;
  sentence: string;
  likeCount: number;
  commentCount: number;
  updatedTime: string;
  postedTime: string;
  deleted: boolean;
  myLike: boolean;
};
