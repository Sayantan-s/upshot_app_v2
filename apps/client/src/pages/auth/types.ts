import { ILoginRequest, IRegisterRequest } from '@client/store/types/auth';

// Register

export type IRegisterFields = IRegisterRequest & { confirm: string };

// Login

export type ILoginFields = ILoginRequest;
