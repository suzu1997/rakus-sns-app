import { memo, FC, MouseEventHandler } from "react";

export type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const PostBtn: FC<Props> = memo((props) => {
  const { onClick } = props;

  return (
    <>
      <div className="fixed bottom-14 right-10">
        <button
          type="button"
          className="rounded-full text-white bg-basic w-10 h-10"
          onClick={onClick}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </>
  );
});
