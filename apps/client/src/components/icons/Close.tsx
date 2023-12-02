import { FC } from "react";
import { IconProps } from "./types";

export const Close: FC<IconProps> = ({ size, className }) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L12 12M12 12L18 6M12 12L6 6M12 12L18 18"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
