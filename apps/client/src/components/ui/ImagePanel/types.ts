import { VariantProps } from "class-variance-authority";
import { HTMLMotionProps } from "framer-motion";
import { styles } from "./styles";

export interface IImagePanelProps {
  className?: string;
  src: string;
  alt: string;
  fileName: string;
}

export type Props = VariantProps<typeof styles> &
  HTMLMotionProps<"button"> &
  IImagePanelProps;
