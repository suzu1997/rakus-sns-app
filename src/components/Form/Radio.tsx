import { FC } from "react";

export type Props = {
  id: string;
  value: string;
  name: string;
  defaultChecked?: boolean;
};

export const Radio: FC<Props> = (props) => {
  const { value, id, name, defaultChecked } = props;
  return (
    <div>
      <div className="flex-col text-left">
        <input
          type="radio"
          name={name}
          value={value}
          id={id}
          defaultChecked={defaultChecked}
        />
        <label htmlFor={id}>{id}</label>
      </div>
    </div>
  );
};
