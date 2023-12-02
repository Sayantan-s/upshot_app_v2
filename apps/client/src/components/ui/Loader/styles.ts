import { cva } from "class-variance-authority";

export const loaderStyles = cva("", {
  variants: {
    variant: {
      "primary.solid": "fill-emerald-50",
      "secondary.solid": "fill-orange-50",
      "neutral.solid": "fill-slate-50",
      "primary.flat": "fill-emerald-500",
      "secondary.flat": "fill-orange-500",
      "neutral.flat": "fill-slate-900",
      "primary.ghost": "fill-emerald-500",
      "secondary.ghost": "fill-orange-500",
      "neutral.ghost": "fill-slate-900",
      "neutral.outline": "fill-slate-900",
      "danger.solid": "fill-rose-50",
      "danger.flat": "fill-rose-500",
      "danger.ghost": "fill-rose-500",
      "danger.outline": "fill-rose-500",
    },
    size: {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
      xl: "w-8 h-8",
    },
  },
  defaultVariants: {
    variant: "primary.solid",
  },
});
