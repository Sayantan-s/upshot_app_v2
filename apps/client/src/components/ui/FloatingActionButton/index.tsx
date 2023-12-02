import { useClickOutside, useToggle } from '@client/hooks';
import { motion } from 'framer-motion';
import { FC, createContext, useContext, useEffect, useRef } from 'react';
import {
  FloatingButtonOptions,
  IFloatingActionButtonContext,
  Props,
} from './types';

const FloatingActionButtonContext =
  createContext<IFloatingActionButtonContext | null>(null);

export const Root: FC<Props> = ({
  onSelect,
  children,
  actionButtonIcon,
  className,
  open,
}) => {
  const [isOpen, { toggle, off, on }] = useToggle(open);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    open ? on() : off();
  }, [open]);

  useClickOutside(ref, off);

  return (
    <FloatingActionButtonContext.Provider value={{ onSelect, off }}>
      <div
        className="sticky bottom-4 left-full w-max flex justify-end mr-3 flex-col"
        ref={ref}
      >
        {isOpen ? (
          <div className="mb-3 flex flex-col space-y-2">{children}</div>
        ) : null}
        <motion.button
          className={className}
          onClick={toggle}
          whileTap={{ scale: 0.98 }}
        >
          {actionButtonIcon}
        </motion.button>
      </div>
    </FloatingActionButtonContext.Provider>
  );
};

const FloatingButtonOption: FC<FloatingButtonOptions> = ({
  value,
  children,
  className,
  tooltip,
}) => {
  const context = useContext(FloatingActionButtonContext);
  const [showToolTip, { on, off }] = useToggle();
  const onHandleSelectOption = () => {
    context?.onSelect?.(value);
    context?.off();
  };

  return (
    <div className="relative">
      {tooltip && showToolTip ? (
        <div className="absolute top-1/2 transform -translate-y-1/2 mr-2 rounded-lg text-xs right-full bg-gray-900/50  text-gray-50 px-3 py-2 w-max shadow shadow-slate-500/20">
          {tooltip}
        </div>
      ) : null}
      <button
        className={className}
        onClick={onHandleSelectOption}
        onMouseMove={on}
        onMouseOut={off}
      >
        {children}
      </button>
    </div>
  );
};

export const FloatingActionButton = Object.assign(Root, {
  Option: FloatingButtonOption,
});
