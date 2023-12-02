import { forwardRef } from "react";
import { IFileProps } from "./types";

export const FileInput = forwardRef<HTMLInputElement, IFileProps>(
  ({ error, children, id, className, ...rest }, ref) => {
    return (
      <label htmlFor={id} className={className}>
        {children}
        <input hidden id={id} type="file" ref={ref} {...rest} />
      </label>
    );
  }
);
