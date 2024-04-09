import { cva } from 'class-variance-authority';

export const styles = cva('font-semibold flex items-center cursor-pointer', {
  variants: {
    variant: {
      'primary.solid':
        'bg-emerald-500 text-emerald-50 hover:bg-emerald-600/90 border border-emerald-400',
      'secondary.solid':
        'bg-orange-500 text-orange-50 hover:bg-orange-600/90 border border-orange-400',
      'neutral.solid': 'bg-slate-800 text-slate-50 border border-slate-400',
      'primary.flat': 'bg-emerald-50 text-emerald-500',
      'secondary.flat': 'bg-orange-50 text-orange-500',
      'neutral.flat': 'bg-slate-50 text-slate-900',
      'primary.ghost': 'text-emerald-500',
      'secondary.ghost': 'text-orange-500',
      'neutral.ghost': 'text-slate-900',
      'neutral.outline': 'text-slate-900 border-2 border-slate-100',
      'danger.solid': 'bg-rose-500 text-rose-50',
      'danger.flat': 'bg-rose-50 text-rose-500',
      'danger.ghost': 'text-rose-500',
      'danger.outline': 'text-rose-500 border border-slate-200',
    },
    disabled: {
      true: 'disabled:opacity-70',
    },
    rounded: {
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
    },
    size: {
      sm: 'min-w-[80px] px-3 h-9',
      md: 'min-w-[100px] px-4 h-10',
      lg: 'min-w-[150px] px-5 h-12',
      xl: 'min-w-[150px] px-6 h-14',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'primary.solid',
    disabled: false,
    size: 'sm',
    rounded: 'sm',
  },
});
