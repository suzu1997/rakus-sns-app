import { memo, FC } from "react";

export const PostBtn: FC = memo(() => {
  return (
    <>
      <button
        type="button"
        className="rounded-full text-white bg-basic w-10 h-10"
      >
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
});
