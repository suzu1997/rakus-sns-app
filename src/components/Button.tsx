import { MouseEventHandler, VFC } from "react";

type Props = {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Button: VFC<Props> = (props) => {
  const { label, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="border rounded-md p-3 border-gray-600 hover:bg-gray-200"
    >
      <span>{label}</span>
    </button>
  );
};
