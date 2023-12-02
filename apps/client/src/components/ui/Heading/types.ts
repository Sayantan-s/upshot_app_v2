import { VariantProps } from 'class-variance-authority';
import { HTMLMotionProps } from 'framer-motion';
import { styles } from './styles';

export type Level = '1' | '2' | '3' | '4' | '5' | '6';

export interface HeadingProps {
  as?: `h${Level}`;
}

export type Props = VariantProps<typeof styles> &
  HTMLMotionProps<'h1'> &
  HeadingProps;
