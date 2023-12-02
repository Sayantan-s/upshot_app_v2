import { useClickOutside } from '@client/hooks';
import { AnimatePresence, motion, MotionStyle } from 'framer-motion';
import {
  FC,
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Props } from './type';

const styles: MotionStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  x: '-50%',
  y: '-50%',
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  show,
  onHide,
  freeze,
}) => {
  const [isOpen, setIsOpen] = useState(show);
  const ref = useRef(null);
  useClickOutside(ref, () => {
    if (!freeze) {
      setIsOpen(false);
      onHide?.();
    }
  });
  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  return createPortal(
    <Fragment>
      <AnimatePresence>
        {isOpen ? (
          <motion.figure
            style={styles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50"
            ref={ref}
          >
            {children}
          </motion.figure>
        ) : null}
      </AnimatePresence>
      {isOpen ? (
        <div className="w-screen h-screen bg-gray-900/50 backdrop-blur-xl z-10 fixed top-0 left-0" />
      ) : null}
    </Fragment>,
    document.getElementById('modal') as HTMLElement
  );
};
