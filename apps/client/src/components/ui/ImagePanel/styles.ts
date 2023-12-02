import { cva } from "class-variance-authority";

export const styles = cva(
  "p-1.5 text-xs font-bold rounded-full flex items-center w-[130px] space-x-2 shadow-md",
  {
    variants: {
      variant: {
        secondary: "bg-white text-slate-500 shadow-slate-900/5",
        primary: "bg-emerald-500 text-emerald-500 shadow-emerald-500/30",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const fileNameStyles = cva("", {
  variants: {
    variant: {
      secondary: "text-slate-900",
      primary: "text-emerald-50",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
