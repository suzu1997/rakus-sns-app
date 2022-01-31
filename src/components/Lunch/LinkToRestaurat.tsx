import { FC, memo } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  restaurantId: number;
  restaurantName: string;
  restaurantImg: string;
};

/**
 * レビューから対象の店詳細ページへのリンクカード.
 */
export const LinkToRestaurant: FC<Props> = memo((props) => {
  const { restaurantId, restaurantName, restaurantImg } = props;

  return (
    <Link href={`/lunch/restaurant/${restaurantId}`} prefetch={false}>
      <a className="flex gap-5 items-center border border-gray-300 rounded-md mb-3 w-4/5 mx-auto">
        <Image
          src={restaurantImg}
          width={100}
          height={80}
          alt="restaurant photo"
        />
        <div className="font-bold text-sm sm:text-md lg:text-lg pr-1">
          {restaurantName}
        </div>
      </a>
    </Link>
  );
});
