import { cva } from 'class-variance-authority';

export const styles = cva([], {
  variants: {
    level: {
      '1': 'text-5xl',
      '2': 'text-3xl',
      '3': 'text-xl',
      '4': 'text-lg',
      '5': 'text-md',
      '6': 'text-base',
    },
    weight: {
      bold: 'font-bold',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    level: '1',
  },
});
