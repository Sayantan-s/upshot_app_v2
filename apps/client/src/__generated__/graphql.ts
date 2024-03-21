/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Config = {
  __typename?: 'Config';
  area?: Maybe<MediaCropArea>;
  fileName?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<MediaCropMetaData>;
};

export enum InterestsType {
  Ai = 'AI',
  Dtt = 'DTT',
  Et = 'ET',
  Ft = 'FT',
  Mt = 'MT',
  Oss = 'OSS',
  Pt = 'PT',
  SaaS = 'SaaS',
}

export type MediaConfig = {
  __typename?: 'MediaConfig';
  config?: Maybe<Config>;
  current?: Maybe<Scalars['String']['output']>;
  raw?: Maybe<Scalars['String']['output']>;
};

export type MediaCropArea = {
  __typename?: 'MediaCropArea';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
};

export type MediaCropConfigCoords = {
  __typename?: 'MediaCropConfigCoords';
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
};

export type MediaCropMetaData = {
  __typename?: 'MediaCropMetaData';
  crop?: Maybe<MediaCropConfigCoords>;
  rotate?: Maybe<Scalars['Float']['output']>;
  zoom?: Maybe<Scalars['Float']['output']>;
};

export type Product = {
  __typename?: 'Product';
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  launchedAt?: Maybe<Scalars['String']['output']>;
  media?: Maybe<ProductMedia>;
  price?: Maybe<ProductPrice>;
  productDescription?: Maybe<Scalars['String']['output']>;
  productMoto?: Maybe<Scalars['String']['output']>;
  productName?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ProductStatus>;
  tags?: Maybe<Array<Maybe<InterestsType>>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type ProductMedia = {
  __typename?: 'ProductMedia';
  productCover?: Maybe<MediaConfig>;
  productLogo?: Maybe<MediaConfig>;
};

export type ProductPrice = {
  __typename?: 'ProductPrice';
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<ProductPriceCurrency>;
  soldAt?: Maybe<Scalars['Float']['output']>;
};

export enum ProductPriceCurrency {
  Inr = 'INR',
  Usd = 'USD',
}

export enum ProductStatus {
  ComingSoon = 'COMING_SOON',
  Idle = 'IDLE',
  Launched = 'LAUNCHED',
  Sold = 'SOLD',
}

export type Query = {
  __typename?: 'Query';
  getProducts: Array<Product>;
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  getProducts: Array<{
    __typename?: 'Product';
    productName?: string | null;
    launchedAt?: string | null;
    createdAt?: string | null;
    createdBy?: string | null;
    tags?: Array<InterestsType | null> | null;
    id?: string | null;
    price?: {
      __typename?: 'ProductPrice';
      amount?: number | null;
      currency?: ProductPriceCurrency | null;
      soldAt?: number | null;
    } | null;
  }>;
};

export const GetAllProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllProducts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProducts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'productName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'launchedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdBy' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'soldAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllProductsQuery, GetAllProductsQueryVariables>;
