import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { styles } from './styles';
import { Props } from './types';

export const Heading = forwardRef<HTMLHeadingElement, Props>(
  ({ level, weight, className = '', as = 'h1', ...rest }, ref) => {
    const Component = motion[as];
    return (
      <Component
        className={[styles({ level, weight }), className].join(' ')}
        {...rest}
        ref={ref}
      />
    );
  }
);
