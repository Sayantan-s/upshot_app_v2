import { cva } from 'class-variance-authority';

export const styles = cva(
  'p-[5px] text-xs font-bold rounded-full flex items-center shadow-md',
  {
    variants: {
      variant: {
        secondary: 'bg-white text-slate-500 shadow-slate-900/5',
        primary: 'bg-emerald-500 text-emerald-500 shadow-emerald-500/30',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export const fileNameStyles = cva('max-w-[100px]', {
  variants: {
    variant: {
      secondary: 'text-slate-900',
      primary: 'text-emerald-50',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const closeButtonStyles = cva('', {
  variants: {
    variant: {
      secondary: 'stroke-slate-300',
      primary: 'stroke-emerald-50',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
