import { FC } from "react";
import { fileNameStyles, styles } from "./styles";
import { Props } from "./types";

export const ImagePanel: FC<Props> = ({
  className,
  variant,
  src,
  alt,
  fileName,
}) => {
  return (
    <div className={styles({ className, variant })}>
      <div className="h-[24px] aspect-square relative rounded-full overflow-hidden">
        <img
          src={
            src ||
            "https://images.unsplash.com/photo-1698507960719-f5e72c98121a?auto=format&fit=crop&q=80&w=3432&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={alt}
          className="absolute left-0 top-0 object-cover w-full h-full"
        />
      </div>
      <p className={fileNameStyles({ variant, className: "truncate" })}>
        {fileName}
      </p>
    </div>
  );
};
