import { IMediaPayload } from './media';

export enum EInterestsType {
  PT = 'PT',
  MT = 'MT',
  AI = 'AI',
  FT = 'FT',
  ET = 'ET',
  OSS = 'OSS',
  DTT = 'DTT',
  SaaS = 'SaaS',
}

export enum EProductStatus {
  IDLE = 'IDLE',
  COMING_SOON = 'COMING_SOON',
  LAUNCHED = 'LAUNCHED',
  SOLD = 'SOLD',
}

export enum ProductPriceCurrency {
  USD = 'USD',
  INR = 'INR',
}

export interface IProductMediaPayload {
  productLogo: IMediaPayload | null;
  productCover: IMediaPayload | null;
}
export interface IProductPricePayload {
  amount: number;
  currency: keyof typeof ProductPriceCurrency;
  soldAt?: number;
}

export interface IProduct {
  id: string;
  productName: string;
  productMoto: string;
  productDescription: string;
  tags: (keyof typeof EInterestsType)[];
  status: keyof typeof EProductStatus | null;
  createdAt: Date;
  updatedAt: Date;
  launchedAt: Date | null;
  createdBy: string;
  updatedBy: string;
  userId: string;
  media: IProductMediaPayload | null;
  price: IProductPricePayload | null;
}

// GENERATION
export interface IGenerationRequest extends ICreateProduct {
  setupInitialFiveAutomatedPosts: boolean;
  generateProductDescription: boolean;
}
export interface IGenerationResponse {
  description: string;
  logo?: string;
  cover?: string;
}

// CREATE

export type ICreateProduct = Pick<IProduct, 'productName' | 'productMoto'>;

// UPDATE

export type IUpdateProduct = Partial<IProduct>;

// FETECH

export type IFetchProduct = Partial<IProduct>;
