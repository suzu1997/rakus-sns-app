export type LunchReview = {
  id: number;
  userId: number;
  accountName: string;
  userPhotoPath: string;
  restaurantId: number;
  restaurantName: string;
  restaurantPhotoPath: string;
  star: number;
  sentence: string;
  likeCount: number;
  commentCount: number;
  updatedTime: Date | null;
  postedTime: Date;
  deleted: boolean;
  myLike: boolean;
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
  introduction: string;
  userPhotoPath: string;
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
export type Timeline = {
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

//タイムライン詳細
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

//タイムラインコメント
export type TimelineComment = [
  {
    id: number;
    userId: number;
    accountName: string;
    userPhotoPath: string;
    timelineId: number;
    reviewId: number;
    parentCommentId: number;
    comment: string;
    commentLikeCount: number;
    actionedTime: string;
    hasNoticed: boolean;
    commentDeleted: boolean;
    read: boolean;
    like: boolean;
    myLike: boolean;
  },
];
