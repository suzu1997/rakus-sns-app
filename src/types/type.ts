export type LunchReview = {
  reviewId: number;
  star: number;
  name: string;
  sentence: string;
  likeCount: number;
  commentCount: number;
  userId: string;
  accountName: string,
  userImg: string
  restaurantId: number;
  restaurantName: string;
  restaurantImg: string;
  time?: Date;
  type?: string; // 一覧か詳細か
  hasRestaurantInfo?: boolean; // 店詳細ページへのリンクを表示するかどうか
}