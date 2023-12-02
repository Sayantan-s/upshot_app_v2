import { VariantProps } from "class-variance-authority";
import { HTMLMotionProps } from "framer-motion";
import { IProps } from "../Loader/types";
import { styles } from "./styles";

export interface IButtonProps {
  isLoading?: boolean;
  icon?: JSX.Element;
  iconPlacement?: "left" | "right" | "center.right" | "center.left";
  loaderVersion?: IProps["version"];
}

export type Props = VariantProps<typeof styles> &
  HTMLMotionProps<"button"> &
  IButtonProps;
