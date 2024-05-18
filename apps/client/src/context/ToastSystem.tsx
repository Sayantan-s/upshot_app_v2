import { Danger, InfoCircle } from 'iconsax-react';
import { FC, Fragment, PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export const ToastSystem: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Toaster
        icons={{
          warning: <Danger size="32" color="#FF8A65" />,
          info: <InfoCircle size="32" color="#FF8A65" />,
        }}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              'border border-gray-200 shadow shadow-gray-900/5 w-96 px-4 py-3 rounded-xl',
            title: 'font-bold text-gray-700',
            description: 'text-xs text-gray-400',
            actionButton: 'bg-zinc-400',
            cancelButton: 'bg-orange-400',
            closeButton: 'bg-lime-400',
            default: 'bg-white group danger',
          },
        }}
      />
      {children}
    </Fragment>
  );
};
