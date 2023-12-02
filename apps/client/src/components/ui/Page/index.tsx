import { classNames } from '@client/helpers/classNames';
import { HTMLMotionProps, motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
interface PageProps extends HTMLMotionProps<'div'> {
  className?: string;
}

export const Page: React.FC<PropsWithChildren<PageProps>> = ({
  children,
  className,
  ...rest
}) => {
  const styles = classNames(['h-full', className]);
  return (
    <motion.div className={styles} {...rest}>
      {children}
    </motion.div>
  );
};
