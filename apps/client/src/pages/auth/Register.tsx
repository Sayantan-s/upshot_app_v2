import { HeadingMoto } from '@client/components/pages';
import { Logo } from '@client/components/shared';
import { Button, Page, TextField } from '@client/components/ui';
import ValidationSchema from '@client/constants/validation_schemas';
import { authApi } from '@client/store/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { IRegisterFields } from './types';

export const Register = () => {
  const {
    handleSubmit,
    register: formStateHandler,
    formState,
  } = useForm<IRegisterFields>({
    defaultValues: {
      email: '',
      pwd: '',
      userName: '',
      confirm: '',
    },
    resolver: zodResolver(ValidationSchema.register),
  });

  const [register, { isLoading }] = authApi.useRegisterMutation();
  const [dummyLogin, dummyLoginState] = authApi.useEasyMutation();
  const navigate = useNavigate();

  const onSubmit = async (values: IRegisterFields) => {
    await register({
      email: values.email,
      pwd: values.pwd,
      userName: values.userName,
    }).unwrap();
    navigate('/');
  };

  const onDummyLogin = async () => {
    await dummyLogin(null).unwrap();
    navigate('/');
  };

  return (
    <Page className="mx-auto max-w-7xl">
      <div className="relative top-1/2 transform -translate-y-1/2">
        <div>
          <Logo className="mx-auto" />
          <HeadingMoto />
        </div>
        <div className="max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 mt-8"
          >
            <TextField
              type={'text'}
              placeholder={'gavifcb_11'}
              {...formStateHandler('userName')}
              error={formState.errors.userName}
            />
            <TextField
              type={'email'}
              placeholder={'gavi.fcb@gmail.com'}
              {...formStateHandler('email')}
              error={formState.errors.email}
            />
            <TextField
              type={'password'}
              placeholder={'Pas***'}
              {...formStateHandler('pwd')}
              error={formState.errors.pwd}
            />
            <TextField
              type={'password'}
              placeholder={'Confirm Pas***'}
              {...formStateHandler('confirm')}
              error={formState.errors.confirm}
            />
            <Button
              variant={'neutral.solid'}
              size={'xl'}
              rounded={'lg'}
              fullWidth
              isLoading={isLoading || dummyLoginState.isLoading}
            >
              Let's gowww
            </Button>
          </form>
          <p className="text-center my-6 flex justify-center items-center gap-2 after:w-7 after:h-[1px] after:bg-slate-300 before:w-7 before:h-[1px] before:bg-slate-300">
            OR
          </p>
          <Button
            variant={'neutral.outline'}
            size={'lg'}
            rounded={'lg'}
            fullWidth
            onClick={onDummyLogin}
            isLoading={isLoading || dummyLoginState.isLoading}
          >
            {' '}
            Try for free
          </Button>
          <div className="mt-6 text-center">
            Already have an account ?{' '}
            <Link to={'/login'} className="text-sky-500 font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};
