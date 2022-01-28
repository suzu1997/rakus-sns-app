/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { ReviewCard } from "../src/components/Lunch/ReviewCard";
import { LunchReview } from "../src/types/type";
import { getFormattedDate } from "../src/utils/methods";

// describeでテストのタイトルを定義
describe("ReviewCard Component Test", () => {
  type Props = LunchReview & {
    type: string;
    hasRestaurantInfo: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviewsMutate: any; // レビューリスト更新のmutate関数
  };

  // ダミーのpropsを定義
  let dummyProps: Props;

  // itでテストケースを定義
  it("レビューカードが上手く表示されるか(一覧、レストランリンク付き)", () => {
    // モック関数を定義
    const reviewsMutate = jest.fn();
    dummyProps = {
      id: 1,
      userId: 1,
      accountName: "dummy account name",
      userPhotoPath: "dummy user photo path",
      restaurantId: 1,
      restaurantName: "dummy restaurant name",
      restaurantPhotoPath: "dummy restaurant photo path",
      star: 5,
      sentence: "dummy sentence",
      likeCount: 30,
      commentCount: 10,
      postedTime: new Date("2022-01-28T12:00:00"),
      myLike: true,
      type: "一覧",
      hasRestaurantInfo: true,
      reviewsMutate: reviewsMutate,
    };
    // ダミーのpropsを渡してコンポーネントをレンダー
    render(<ReviewCard {...dummyProps} />);
    // expectで検証したい内容を記述
    expect(screen.getByText(dummyProps.accountName)).toBeInTheDocument();
    expect(screen.getByText(`(${dummyProps.star})`)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.sentence)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.likeCount)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.commentCount)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.restaurantName)).toBeInTheDocument();
  });

  it("レビューカードが上手く表示されるか(詳細、レストランリンク付き)", () => {
    dummyProps.type = "詳細";

    // ダミーのpropsを渡してコンポーネントをレンダー
    render(<ReviewCard {...dummyProps} />);
    expect(screen.getByText(dummyProps.accountName)).toBeInTheDocument();
    expect(screen.getByText(`(${dummyProps.star})`)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.sentence)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.likeCount)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.commentCount)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.restaurantName)).toBeInTheDocument();
    expect(
      screen.getByText(
        `投稿日時：${getFormattedDate(new Date(dummyProps.postedTime))}`, // 詳細なら投稿日時が表示されるか
      ),
    ).toBeInTheDocument();
  });
});
