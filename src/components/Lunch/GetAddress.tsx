import { FC, memo } from "react";
import { TextInput } from "../Form/TextInput";

export const GetAddress: FC = memo(() => {
  return (
    <>
      <TextInput label="" type="text" fullWidth={false} required={false} />
    </>
  );
});
