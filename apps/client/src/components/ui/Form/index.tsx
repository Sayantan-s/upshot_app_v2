import { Eye, EyeSlash } from 'iconsax-react';
import { FC, forwardRef, useReducer } from 'react';
import { FileInput } from './File';
import { ITextAreaProps, ITextFieldProps } from './types';

const Root = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ type, ...rest }, ref) => {
    if (type === 'password') return <PasswordField {...rest} ref={ref} />;
    return <InputField {...rest} type={type} ref={ref} />;
  }
);

const PasswordField = forwardRef<
  HTMLInputElement,
  Omit<ITextFieldProps, 'type'>
>(({ error, ...rest }, ref) => {
  const [isPassword, togglePassword] = useReducer(
    (prevState) => !prevState,
    true
  );

  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (eve) => {
    eve.preventDefault();
    togglePassword();
  };

  return (
    <div>
      <div
        className={`flex border-b border-slate-300 ${
          error
            ? 'focus-within:border-red-500 border-rose-300'
            : 'focus-within:border-slate-400'
        }`}
      >
        <input
          {...rest}
          className={`w-full text-gray-600 placeholder:tracking-normal ${
            isPassword ? 'tracking-[0.3rem]' : 'tracking-normal'
          } py-2.5 text-base focus:outline-none`}
          type={isPassword ? 'password' : 'text'}
          ref={ref}
          autoComplete="off"
        />
        <button
          onClick={handleToggle}
          className={`mr-2 ${error ? 'text-red-500' : 'text-slate-300'}`}
        >
          {isPassword ? (
            <Eye size={16} variant="Bulk" />
          ) : (
            <EyeSlash size={16} variant="Bulk" />
          )}{' '}
        </button>
      </div>
      <ErrorMessage error={error} />
    </div>
  );
});

const InputField = forwardRef<HTMLInputElement, ITextFieldProps>(
  ({ error, className, ...rest }, ref) => {
    return (
      <div>
        <div>
          <input
            {...rest}
            ref={ref}
            className={`text-gray-600 ${
              error ? 'border-rose-300' : ''
            } w-full py-2.5 text-base border-b border-slate-300 focus:outline-none ${
              error ? 'focus:border-red-500' : 'focus:border-slate-400'
            } ${className || ''}`}
            autoComplete="off"
          />
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  }
);

const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ error, className, ...rest }, ref) => {
    return (
      <div className="w-full">
        <div className="w-full">
          <textarea
            {...rest}
            ref={ref}
            className={`text-gray-600 resize-none ${
              error ? 'border-rose-300' : ''
            } w-full py-2.5 text-base border-b border-slate-300 focus:outline-none ${
              error ? 'focus:border-red-500' : 'focus:border-slate-400'
            } ${className || ''}`}
            autoComplete="off"
          />
        </div>
        <ErrorMessage error={error} />
      </div>
    );
  }
);

const ErrorMessage: FC<Pick<ITextFieldProps, 'error'>> = ({ error }) => (
  <p className="text-rose-600 h-2 text-xs mt-1">
    {typeof error === 'string' ? error : error?.message}
  </p>
);

export const TextField = Object.assign(Root, { TextArea, File: FileInput });
