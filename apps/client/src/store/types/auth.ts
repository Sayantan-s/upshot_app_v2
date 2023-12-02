// Registration
export interface IRegisterRequest {
  email: string;
  userName: string;
  pwd: string;
}

export interface IRegisterResponse {
  accessToken: string;
}

// Login
export interface ILoginRequest {
  identity: string;
  pwd: string;
}
export type ILoginResponse = IRegisterResponse;

// Refresh

export interface IRefreshRequest {
  resetOnFailure?: boolean;
}

export type IRefreshResponse = IRegisterResponse;

// Easy
export interface IEasyRequest {
  email: string;
}
export type IEasyResponse = IRegisterResponse;

export interface IRequestUserParams {
  userId: string;
}
export interface TransformedLoginApiResponse {
  status: number | undefined;
}

export type ProfileLinks = {
  instgram?: string | null;
  linkedin: string;
  github?: string | null;
  dribble: string;
  behance?: string | null;
  website: string;
};

export type UserDetails = {
  first_name: string;
  last_name: string;
  headline: string;
  about: string;
  profile_links: ProfileLinks;
  profile_pic: string;
};

export type User = {
  id: string;
  email: string;
  newUser: boolean;
  updated_at: string;
  created_at: string;
  userName: string;
  profilePic: string;
  coverPic: string;
  about: string;
  firstName: string;
  lastName: string;
  location: string;
};

export interface Session {
  expires_at: Date;
  session_id: string;
}

export interface VerifyApiPayload {
  session_jwt: string | null;
  session_token: string | null;
  session: Session | null;
  user: User;
  access_token: string | null;
}

export interface IAuthResponse {
  accessToken: string | null;
}
