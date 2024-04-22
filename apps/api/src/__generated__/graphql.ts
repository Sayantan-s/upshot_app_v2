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

export enum CreationMethod {
  GenAi = 'GEN_AI',
  Manual = 'MANUAL',
}

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

export type Mutation = {
  __typename?: 'Mutation';
  updateShot: Scalars['String']['output'];
};

export type MutationUpdateShotArgs = {
  shotId: Scalars['ID']['input'];
  shotInput: ShotInput;
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
  getShots: Array<Shot>;
};

export type QueryGetShotsArgs = {
  productId?: InputMaybe<Scalars['String']['input']>;
};

export type Shot = {
  __typename?: 'Shot';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  creationMethod?: Maybe<CreationMethod>;
  id?: Maybe<Scalars['ID']['output']>;
  launchedAt?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<ProductStatus>;
  status?: Maybe<ShotStatus>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  votes?: Maybe<Scalars['Int']['output']>;
};

export type ShotInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  creationMethod?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  launchedAt?: InputMaybe<Scalars['Int']['input']>;
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  productId?: InputMaybe<Scalars['String']['input']>;
  productType?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
  votes?: InputMaybe<Scalars['Int']['input']>;
};

export enum ShotStatus {
  Deleted = 'DELETED',
  Idle = 'IDLE',
  Scheduled = 'SCHEDULED',
  Shoot = 'SHOOT',
}

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

export type UpdateShotMutationVariables = Exact<{
  shotId: Scalars['ID']['input'];
  shotInput: ShotInput;
}>;

export type UpdateShotMutation = {
  __typename?: 'Mutation';
  updateShot: string;
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
export const UpdateShotDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateShot' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shotId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'shotInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ShotInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateShot' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shotId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shotId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'shotInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'shotInput' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateShotMutation, UpdateShotMutationVariables>;
