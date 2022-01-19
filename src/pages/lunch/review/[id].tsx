import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { FavoBtn } from "../../../components/Button/FavoBtn";
import { SubHeader } from "../../../components/Layout/SubHeader";
import { TrashBtn } from "../../../components/Button/TrashBtn";
import { ReviewCard } from "../../../components/Lunch/ReviewCard";
import { JAVA_API_URL } from "../../../utils/const";
import { LunchReview } from "../../../types/type";

type ReviewWithComment = LunchReview & {
  comment?: { value: string; count: number }[];
};

const ReviewDetail: NextPage = () => {
  const router = useRouter();
  const reviewId = Number(router.query.id);

  const { data: review, error } = useSWR<ReviewWithComment>(
    `${JAVA_API_URL}/reviews/${reviewId}`,
  );

  if (!error && !review) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>データを取得できませんでした</div>;
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <SubHeader title="レビュー詳細" />
        <div
          className="cursor-pointer ml-5 mt-2"
          onClick={() => {
            router.back();
          }}
        >
          ←戻る
        </div>
        {review && (
          <>
            <ReviewCard {...review} type="詳細" hasRestaurantInfo={true} />
            {/* コメント部分 */}
            {review.comment?.map((value: any, index: number) => (
              <div key={index} className="flex border border-b border-gray-200">
                <div className="w-1/5 text-center pt-5">
                  <Image
                    src="/usakus.jpg"
                    width={100}
                    height={100}
                    alt="icon"
                  />
                </div>

                <div className="w-4/5">
                  <div className="text-xl font-extrabold pt-3 pb-3">
                    {value.name}
                  </div>
                  <div className="pt-5 pb-5 pl-5">{value.content}</div>
                  <div className="w-full text-right pt-3 pb-3">
                    <FavoBtn />
                    <TrashBtn />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
