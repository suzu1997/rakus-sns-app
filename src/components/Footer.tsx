/**
 * footer.
 */
import { memo, FC } from "react";

export const Footer: FC = memo(() => {
  return (
    <footer className="h-12 w-full shadow-md bg-basic text-sm text-gray-600 flex justify-center items-center">
      ©lunchkus
    </footer>
  );
});
