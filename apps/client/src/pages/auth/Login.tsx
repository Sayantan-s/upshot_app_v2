import { HeadingMoto } from '@client/components/pages';
import { Logo } from '@client/components/shared';
import { Button, Page, TextField } from '@client/components/ui';
import ValidationSchema from '@client/constants/validation_schemas';
import { authApi } from '@client/store/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ILoginFields } from './types';

export const Login = () => {
  const {
    handleSubmit,
    register: formStateHandler,
    formState,
  } = useForm<ILoginFields>({
    defaultValues: {
      identity: '',
      pwd: '',
    },
    resolver: zodResolver(ValidationSchema.login),
  });
  const [login, { isLoading }] = authApi.useLoginMutation();
  const [dummyLogin, dummyLoginState] = authApi.useEasyMutation();
  const navigate = useNavigate();

  const onSubmit = async (values: ILoginFields) => {
    await login(values).unwrap();
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
              type={'email'}
              placeholder={'gavi.fcb@gmail.com'}
              {...formStateHandler('identity')}
              error={formState.errors.identity}
            />
            <TextField
              type={'password'}
              placeholder={'Pas***'}
              {...formStateHandler('pwd')}
              error={formState.errors.pwd}
            />
            <Button
              variant={'neutral.solid'}
              size={'xl'}
              rounded={'lg'}
              fullWidth
              isLoading={isLoading}
              disabled={dummyLoginState.isLoading}
              loaderVersion="v1"
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
            isLoading={dummyLoginState.isLoading}
            disabled={isLoading}
            loaderVersion="v1"
          >
            Try for free
          </Button>
          <div className="mt-6 text-center">
            Don’t have an account ?{' '}
            <Link to={'/register'} className="text-sky-500 font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};
