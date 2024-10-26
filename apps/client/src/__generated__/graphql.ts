/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  shots?: Maybe<Array<Maybe<Shot>>>;
  status?: Maybe<ProductStatus>;
  tags?: Maybe<Array<Maybe<InterestsType>>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedBy?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
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
  getShotsByProductId: Array<Shot>;
  getUsers: Array<User>;
};

export type QueryGetShotsByProductIdArgs = {
  productId?: InputMaybe<Scalars['String']['input']>;
};

export type Shot = {
  __typename?: 'Shot';
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['String']['output']>;
  creationMethod?: Maybe<CreationMethod>;
  id?: Maybe<Scalars['ID']['output']>;
  isArchived?: Maybe<Scalars['Boolean']['output']>;
  launchedAt?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<ProductStatus>;
  status?: Maybe<ShotStatus>;
  title?: Maybe<Scalars['String']['output']>;
  tweet?: Maybe<Scalars['Boolean']['output']>;
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
  isArchived?: InputMaybe<Scalars['Boolean']['input']>;
  launchedAt?: InputMaybe<Scalars['Int']['input']>;
  media?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  productId?: InputMaybe<Scalars['String']['input']>;
  productType?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  tweet?: InputMaybe<Scalars['Boolean']['input']>;
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

export type Subscription = {
  __typename?: 'Subscription';
  lauchShot: Shot;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  coverPic?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  interests?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  lastName: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  newUser?: Maybe<Scalars['Boolean']['output']>;
  products?: Maybe<Array<Maybe<Product>>>;
  profilePic?: Maybe<Scalars['String']['output']>;
  pwd: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
  userName?: Maybe<Scalars['String']['output']>;
};

export type UpdateShotMutationVariables = Exact<{
  shotId: Scalars['ID']['input'];
  shotInput: ShotInput;
}>;

export type UpdateShotMutation = {
  __typename?: 'Mutation';
  updateShot: string;
};

export type GetShotsQueryVariables = Exact<{ [key: string]: never }>;

export type GetShotsQuery = {
  __typename?: 'Query';
  getShots: Array<{
    __typename?: 'Shot';
    id?: string | null;
    launchedAt?: number | null;
    media?: Array<string | null> | null;
    productType?: ProductStatus | null;
    votes?: number | null;
    content?: string | null;
    title?: string | null;
    productId?: string | null;
    product?: {
      __typename?: 'Product';
      tags?: Array<InterestsType | null> | null;
      status?: ProductStatus | null;
      launchedAt?: string | null;
      id?: string | null;
      productDescription?: string | null;
      productMoto?: string | null;
      productName?: string | null;
      userId?: string | null;
      user?: {
        __typename?: 'User';
        firstName: string;
        lastName: string;
        about?: string | null;
        coverPic?: string | null;
        userName?: string | null;
        profilePic?: string | null;
        location?: string | null;
        id: string;
      } | null;
      media?: {
        __typename?: 'ProductMedia';
        productCover?: {
          __typename?: 'MediaConfig';
          current?: string | null;
          raw?: string | null;
          config?: {
            __typename?: 'Config';
            fileName?: string | null;
            area?: {
              __typename?: 'MediaCropArea';
              height?: number | null;
              width?: number | null;
              x?: number | null;
              y?: number | null;
            } | null;
            metadata?: {
              __typename?: 'MediaCropMetaData';
              zoom?: number | null;
              rotate?: number | null;
              crop?: {
                __typename?: 'MediaCropConfigCoords';
                y?: number | null;
                x?: number | null;
              } | null;
            } | null;
          } | null;
        } | null;
        productLogo?: {
          __typename?: 'MediaConfig';
          raw?: string | null;
          current?: string | null;
          config?: {
            __typename?: 'Config';
            fileName?: string | null;
            metadata?: {
              __typename?: 'MediaCropMetaData';
              zoom?: number | null;
              rotate?: number | null;
              crop?: {
                __typename?: 'MediaCropConfigCoords';
                y?: number | null;
                x?: number | null;
              } | null;
            } | null;
            area?: {
              __typename?: 'MediaCropArea';
              y?: number | null;
              x?: number | null;
              width?: number | null;
              height?: number | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  }>;
};

export type SubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubscriptionSubscription = {
  __typename?: 'Subscription';
  lauchShot: {
    __typename?: 'Shot';
    id?: string | null;
    launchedAt?: number | null;
    media?: Array<string | null> | null;
    productType?: ProductStatus | null;
    votes?: number | null;
    content?: string | null;
    title?: string | null;
    productId?: string | null;
    product?: {
      __typename?: 'Product';
      tags?: Array<InterestsType | null> | null;
      status?: ProductStatus | null;
      launchedAt?: string | null;
      id?: string | null;
      productDescription?: string | null;
      productMoto?: string | null;
      productName?: string | null;
      userId?: string | null;
      user?: {
        __typename?: 'User';
        firstName: string;
        lastName: string;
        about?: string | null;
        coverPic?: string | null;
        userName?: string | null;
        profilePic?: string | null;
        location?: string | null;
        id: string;
      } | null;
      media?: {
        __typename?: 'ProductMedia';
        productCover?: {
          __typename?: 'MediaConfig';
          current?: string | null;
          raw?: string | null;
          config?: {
            __typename?: 'Config';
            fileName?: string | null;
            area?: {
              __typename?: 'MediaCropArea';
              height?: number | null;
              width?: number | null;
              x?: number | null;
              y?: number | null;
            } | null;
            metadata?: {
              __typename?: 'MediaCropMetaData';
              zoom?: number | null;
              rotate?: number | null;
              crop?: {
                __typename?: 'MediaCropConfigCoords';
                y?: number | null;
                x?: number | null;
              } | null;
            } | null;
          } | null;
        } | null;
        productLogo?: {
          __typename?: 'MediaConfig';
          raw?: string | null;
          current?: string | null;
          config?: {
            __typename?: 'Config';
            fileName?: string | null;
            metadata?: {
              __typename?: 'MediaCropMetaData';
              zoom?: number | null;
              rotate?: number | null;
              crop?: {
                __typename?: 'MediaCropConfigCoords';
                y?: number | null;
                x?: number | null;
              } | null;
            } | null;
            area?: {
              __typename?: 'MediaCropArea';
              y?: number | null;
              x?: number | null;
              width?: number | null;
              height?: number | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  };
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProductsQuery = {
  __typename?: 'Query';
  getProducts: Array<{
    __typename?: 'Product';
    productName?: string | null;
    productMoto?: string | null;
    id?: string | null;
    launchedAt?: string | null;
    status?: ProductStatus | null;
    createdAt?: string | null;
    price?: {
      __typename?: 'ProductPrice';
      soldAt?: number | null;
      currency?: ProductPriceCurrency | null;
      amount?: number | null;
    } | null;
  }>;
};

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
export const GetShotsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetShots' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getShots' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'launchedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'media' } },
                { kind: 'Field', name: { kind: 'Name', value: 'productType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'votes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'about' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverPic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'userName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'profilePic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'location' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'launchedAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productDescription' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productMoto' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'media' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productCover' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'config' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'area' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'height',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'width',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'x',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'y',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'fileName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'metadata',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'crop',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'y',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'x',
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'zoom',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'rotate',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'current' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'raw' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productLogo' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'raw' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'current' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'config' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'metadata',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'zoom',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'crop',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'y',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'x',
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'rotate',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'fileName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'area' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'y',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'x',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'width',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'height',
                                                },
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
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'productId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetShotsQuery, GetShotsQueryVariables>;
export const SubscriptionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'Subscription' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lauchShot' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'launchedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'media' } },
                { kind: 'Field', name: { kind: 'Name', value: 'productType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'votes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'product' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'firstName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'about' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'coverPic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'userName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'profilePic' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'location' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'status' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'launchedAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productDescription' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productMoto' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'productName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'media' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productCover' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'config' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'area' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'height',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'width',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'x',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'y',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'fileName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'metadata',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'crop',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'y',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'x',
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'zoom',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'rotate',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'current' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'raw' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'productLogo' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'raw' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'current' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'config' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'metadata',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'zoom',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'crop',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'y',
                                                      },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'x',
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'rotate',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'fileName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'area' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'y',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'x',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'width',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'height',
                                                },
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
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userId' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'productId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubscriptionSubscription,
  SubscriptionSubscriptionVariables
>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'productMoto' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'price' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'soldAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'launchedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllProductsQuery, GetAllProductsQueryVariables>;
