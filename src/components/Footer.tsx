import { memo, FC } from "react";

export const Footer: FC = memo(() => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };

  return (
    <footer
      className="h-12 w-full shadow-md bg-basic text-sm text-gray-600"
      style={style}
    >
      @ranchkus
    </footer>
  );
});
