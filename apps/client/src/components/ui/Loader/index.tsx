import { VariantProps } from "class-variance-authority";
import { FC } from "react";
import { LoaderV1 } from "./LoaderV1";
import { Loaderv2 } from "./LoaderV2";
import { loaderStyles } from "./styles";
import { IProps } from "./types";

export const Loader: FC<IProps & VariantProps<typeof loaderStyles>> = ({
  className,
  version = "v2",
  variant,
  size,
}) => {
  return version === "v1" ? (
    <LoaderV1 className={loaderStyles({ className, variant, size })} />
  ) : version === "v2" ? (
    <Loaderv2 className={loaderStyles({ className, variant, size })} />
  ) : null;
};
