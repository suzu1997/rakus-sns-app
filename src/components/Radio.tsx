import { FC } from "react";

export type Props = {
  id: string;
  value: string;
};

export const Radio: FC<Props> = (props) => {
  const { value, id } = props;
  return (
    <div>
      <input type="radio" name="sevice" value={value} id={id} />
      <label htmlFor={id}>{id}</label>
    </div>
  );
};
