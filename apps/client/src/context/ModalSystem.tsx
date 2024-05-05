import { Button } from '@client/components/ui';
import { useToggle } from '@client/hooks';
import { BagCross, InfoCircle } from 'iconsax-react';
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Close } from '../components/icons';
import { Modal } from '../components/ui/Modal';

interface IHandle {
  variant: 'danger' | 'info';
  heading: string;
  body: string;
  confirmationBtnText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface IContextProps {
  create: (metaData: IHandle) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IVariantStyles {
  icon: JSX.Element;
  color: string;
  confBtnColor: string;
  iconBg: string;
  gradient: string;
}

const ModalContext = createContext<IContextProps>({} as IContextProps);

const styles: Record<IHandle['variant'], IVariantStyles> = {
  danger: {
    color: '#f43f5e',
    confBtnColor: 'bg-rose-600 ',
    iconBg: 'bg-rose-500',
    icon: <BagCross color="white" size={24} />,
    gradient: 'bg-gradient-to-b from-rose-200 via-white to-white',
  },
  info: {
    color: '#10b981',
    confBtnColor: 'bg-emerald-600',
    iconBg: 'bg-emerald-500',
    icon: <InfoCircle color="white" size={24} />,
    gradient: 'bg-gradient-to-b from-emerald-200 via-white to-white',
  },
};

export const ModalSystem: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, { on, off }] = useToggle();
  const [variant, setVariant] = useState<IHandle['variant'] | ''>('');
  const [content, setContent] = useState({ heading: '', body: '' });
  const [btnText, setBtntext] = useState({ confirmationBtnText: '' });
  const [controllers, setControllers] = useState<
    Pick<IHandle, 'onCancel' | 'onConfirm'>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const create = ({
    variant,
    heading,
    body,
    onCancel,
    onConfirm,
    confirmationBtnText,
  }: IHandle) => {
    setVariant(variant);
    setContent({ heading, body });
    setControllers((prevState) => ({ ...prevState, onCancel, onConfirm }));
    setBtntext({ confirmationBtnText: confirmationBtnText || 'Confirm' });
    on();
  };

  const handleCancel = async () => {
    await controllers?.onCancel?.();
    cleanUp();
  };

  const handleConfirm = async () => {
    await controllers?.onConfirm?.();
    cleanUp();
  };

  const cleanUp = useCallback(() => {
    off();
    setTimeout(() => {
      setVariant('');
      setContent({ heading: '', body: '' });
      setBtntext({ confirmationBtnText: '' });
      setControllers({});
    }, 0);
  }, [off]);

  return (
    <ModalContext.Provider value={{ create, setIsLoading }}>
      {children}
      <Modal show={isOpen} onHide={off}>
        <div
          className={`w-[350px] ${
            variant !== '' ? styles[variant].gradient : ''
          } border-4 border-white  flex flex-col justify-between aspect-video p-5 rounded-2xl`}
        >
          <div>
            <header className="flex justify-between items-start">
              <div
                className={`aspect-square ${
                  variant !== '' ? styles[variant].iconBg : ''
                } p-2 w-14 flex items-center justify-center rounded-full`}
              >
                {variant !== '' ? styles[variant].icon : ''}
              </div>
              <button
                onClick={cleanUp}
                className="bg-white aspect-square p-1 rounded-full"
              >
                <Close size={14} className="stroke-gray-500" />
              </button>
            </header>
            <main className="mt-6">
              <h1 className="text-base text-gray-700 font-bold">
                {content.heading}
              </h1>
              <p
                className="mt-1.5"
                dangerouslySetInnerHTML={{ __html: content.body }}
              />
            </main>
          </div>
          <footer className="flex mt-6 space-x-2">
            <Button
              variant={'unstyled'}
              disabled={isLoading}
              className="flex-1 bg-white rounded-md shadow font-bold border border-gray-100 text-gray-500 h-10"
              onClick={handleCancel}
              size={'md'}
            >
              Cancel
            </Button>
            <Button
              variant={'unstyled'}
              isLoading={isLoading}
              loaderVersion="v2"
              size={'md'}
              className={`flex-1 ${
                variant !== '' ? styles[variant].confBtnColor : ''
              } rounded-md shadow font-bold text-white h-10`}
              onClick={handleConfirm}
            >
              {btnText.confirmationBtnText}
            </Button>
          </footer>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = ({ isLoading }: { isLoading: boolean }) => {
  const context = useContext(ModalContext);

  useEffect(() => {
    if (isLoading) context?.setIsLoading(isLoading);
  }, [isLoading, context]);

  return context;
};
