import { memo, FC } from "react";

export const PostBtn: FC = memo(() => {
  return (
    <>
      <button type="button">
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
});
