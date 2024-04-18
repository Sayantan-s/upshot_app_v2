import { motion } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Loader } from '../Loader';
import { styles } from './styles';
import { Props } from './types';

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      size,
      variant,
      disabled,
      fullWidth,
      rounded,
      isLoading,
      className,
      children,
      icon,
      iconPlacement,
      loaderVersion = 'v2',
      ...rest
    },
    ref
  ) => {
    return (
      <motion.button
        {...(!isLoading || !disabled ? { whileTap: { scale: 0.98 } } : {})}
        {...rest}
        className={styles({
          size,
          variant,
          disabled,
          fullWidth,
          rounded,
          className: twMerge(
            iconPlacement ? 'justify-between' : 'justify-center',
            className
          ),
        })}
        ref={ref}
        disabled={disabled || isLoading}
      >
        {!icon ? (
          isLoading ? (
            <Loader
              variant={variant}
              size={size}
              version={loaderVersion || 'v2'}
            />
          ) : (
            (children as ReactNode)
          )
        ) : (
          <>
            <span
              className={`${
                iconPlacement === 'right'
                  ? 'order-1 ml-1'
                  : iconPlacement === 'left'
                  ? 'order-0 mr-1'
                  : ''
              } inline-block`}
            >
              {isLoading ? (
                <Loader
                  variant={variant}
                  size={size || 'sm'}
                  version={loaderVersion || 'v2'}
                />
              ) : (
                icon
              )}
            </span>
            {children as ReactNode}
          </>
        )}
      </motion.button>
    );
  }
);
