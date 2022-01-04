import { FC } from "react";

export type Props = {
  value: string;
};

export const Radio: FC<Props> = (props) => {
  const { value } = props;
  return (
    <div>
      <input type="radio" name="jobType" value={value} id={value} />
      <label htmlFor={value}>{value}</label>
    </div>
  );
};
