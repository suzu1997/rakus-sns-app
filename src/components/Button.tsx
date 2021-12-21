import { MouseEventHandler, VFC } from 'react';

type Props = {
  label: string,
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button: VFC<Props> = (props) => {
  const { label, onClick } = props;

  return (
    <button type="button" onClick={onClick}>
      <span>{label}</span>
    </button>
  );
};
  