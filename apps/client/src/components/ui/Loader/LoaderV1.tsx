import { FC } from "react";
import { ILoaderProps } from "./types";

export const LoaderV1: FC<ILoaderProps> = (props) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="4" cy="12" r="3" opacity="1">
        <animate
          id="spinner_qYjJ"
          begin="0;spinner_t4KZ.end-0.25s"
          attributeName="opacity"
          dur="0.85s"
          values="1;.2"
        />
      </circle>
      <circle cx="12" cy="12" r="3" opacity=".1">
        <animate
          begin="spinner_qYjJ.begin+0.15s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
      <circle cx="20" cy="12" r="3" opacity=".05">
        <animate
          id="spinner_t4KZ"
          begin="spinner_qYjJ.begin+0.3s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
        />
      </circle>
    </svg>
  );
};
