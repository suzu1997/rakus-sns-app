import { memo, FC } from "react";

export const PostBtn: FC = memo(() => {
  return (
    <>
      <div className="fixed bottom-20 right-10">
        <button
          type="button"
          className="rounded-full text-white bg-basic w-10 h-10"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </>
  );
});
