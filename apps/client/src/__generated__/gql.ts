/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation UpdateShot($shotId: ID!, $shotInput: ShotInput!) {\n    updateShot(shotId: $shotId, shotInput: $shotInput)\n  }\n':
    types.UpdateShotDocument,
  '\n  query GetShots {\n    getShots {\n      id\n      launchedAt\n      media\n      productType\n      votes\n      content\n      title\n      product {\n        user {\n          firstName\n          lastName\n          about\n          coverPic\n          userName\n          profilePic\n          location\n          id\n        }\n        tags\n        status\n        launchedAt\n        id\n        productDescription\n        productMoto\n        productName\n        media {\n          productCover {\n            config {\n              area {\n                height\n                width\n                x\n                y\n              }\n              fileName\n              metadata {\n                crop {\n                  y\n                  x\n                }\n                zoom\n                rotate\n              }\n            }\n            current\n            raw\n          }\n          productLogo {\n            raw\n            current\n            config {\n              metadata {\n                zoom\n                crop {\n                  y\n                  x\n                }\n                rotate\n              }\n              fileName\n              area {\n                y\n                x\n                width\n                height\n              }\n            }\n          }\n        }\n        userId\n      }\n      productId\n    }\n  }\n':
    types.GetShotsDocument,
  '\n  subscription Subscription {\n    lauchShot {\n      id\n      launchedAt\n      media\n      productType\n      votes\n      content\n      title\n      product {\n        user {\n          firstName\n          lastName\n          about\n          coverPic\n          userName\n          profilePic\n          location\n          id\n        }\n        tags\n        status\n        launchedAt\n        id\n        productDescription\n        productMoto\n        productName\n        media {\n          productCover {\n            config {\n              area {\n                height\n                width\n                x\n                y\n              }\n              fileName\n              metadata {\n                crop {\n                  y\n                  x\n                }\n                zoom\n                rotate\n              }\n            }\n            current\n            raw\n          }\n          productLogo {\n            raw\n            current\n            config {\n              metadata {\n                zoom\n                crop {\n                  y\n                  x\n                }\n                rotate\n              }\n              fileName\n              area {\n                y\n                x\n                width\n                height\n              }\n            }\n          }\n        }\n        userId\n      }\n      productId\n    }\n  }\n':
    types.SubscriptionDocument,
  '\n  query GetAllProducts {\n    getProducts {\n      productName\n      productMoto\n      price {\n        soldAt\n        currency\n        amount\n      }\n      id\n      launchedAt\n      status\n      createdAt\n    }\n  }\n':
    types.GetAllProductsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateShot($shotId: ID!, $shotInput: ShotInput!) {\n    updateShot(shotId: $shotId, shotInput: $shotInput)\n  }\n'
): (typeof documents)['\n  mutation UpdateShot($shotId: ID!, $shotInput: ShotInput!) {\n    updateShot(shotId: $shotId, shotInput: $shotInput)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetShots {\n    getShots {\n      id\n      launchedAt\n      media\n      productType\n      votes\n      content\n      title\n      product {\n        user {\n          firstName\n          lastName\n          about\n          coverPic\n          userName\n          profilePic\n          location\n          id\n        }\n        tags\n        status\n        launchedAt\n        id\n        productDescription\n        productMoto\n        productName\n        media {\n          productCover {\n            config {\n              area {\n                height\n                width\n                x\n                y\n              }\n              fileName\n              metadata {\n                crop {\n                  y\n                  x\n                }\n                zoom\n                rotate\n              }\n            }\n            current\n            raw\n          }\n          productLogo {\n            raw\n            current\n            config {\n              metadata {\n                zoom\n                crop {\n                  y\n                  x\n                }\n                rotate\n              }\n              fileName\n              area {\n                y\n                x\n                width\n                height\n              }\n            }\n          }\n        }\n        userId\n      }\n      productId\n    }\n  }\n'
): (typeof documents)['\n  query GetShots {\n    getShots {\n      id\n      launchedAt\n      media\n      productType\n      votes\n      content\n      title\n      product {\n        user {\n          firstName\n          lastName\n          about\n          coverPic\n          userName\n          profilePic\n          location\n          id\n        }\n        tags\n        status\n        launchedAt\n        id\n        productDescription\n        productMoto\n        productName\n        media {\n          productCover {\n            config {\n              area {\n                height\n                width\n                x\n                y\n              }\n              fileName\n              metadata {\n                crop {\n                  y\n                  x\n                }\n                zoom\n                rotate\n              }\n            }\n            current\n            raw\n          }\n          productLogo {\n            raw\n            current\n            config {\n              metadata {\n                zoom\n                crop {\n                  y\n                  x\n                }\n                rotate\n              }\n              fileName\n              area {\n                y\n                x\n                width\n                height\n              }\n            }\n          }\n        }\n        userId\n      }\n      productId\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  subscription Subscription {\n    lauchShot {\n      id\n      launchedAt\n      media\n      productType\n      votes\n      content\n      title\n      product {\n        user {\n          firstName\n          lastName\n          about\n          coverPic\n          userName\n          profilePic\n          location\n          id\n        }\n        tags\n        status\n        launchedAt\n        id\n        productDescription\n        productMoto\n        productName\n        media {\n          productCover {\n            config {\n              area {\n                height\n                width\n                x\n                y\n              }\n              fileName\n              metadata {\n                crop {\n                  y\n                  x\n                }\n                zoom\n                rotate\n              }\n            }\n            current\n            raw\n          }\n          productLogo {\n            raw\n            current\n            config {\n              metadata {\n                zoom\n                crop {\n                  y\n                  x\n                }\n                rotate\n              }\n              fileName\n              area {\n                y\n                x\n                width\n                height\n              }\n            }\n          }\n        }\n        userId\n      }\n      productId\n    }\n  }\n'
): (typeof documents)['\n  subscription Subscription {\n    lauchShot {\n      id\n      launchedAt\n      media\n      productType\n      votes\n      content\n      title\n      product {\n        user {\n          firstName\n          lastName\n          about\n          coverPic\n          userName\n          profilePic\n          location\n          id\n        }\n        tags\n        status\n        launchedAt\n        id\n        productDescription\n        productMoto\n        productName\n        media {\n          productCover {\n            config {\n              area {\n                height\n                width\n                x\n                y\n              }\n              fileName\n              metadata {\n                crop {\n                  y\n                  x\n                }\n                zoom\n                rotate\n              }\n            }\n            current\n            raw\n          }\n          productLogo {\n            raw\n            current\n            config {\n              metadata {\n                zoom\n                crop {\n                  y\n                  x\n                }\n                rotate\n              }\n              fileName\n              area {\n                y\n                x\n                width\n                height\n              }\n            }\n          }\n        }\n        userId\n      }\n      productId\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllProducts {\n    getProducts {\n      productName\n      productMoto\n      price {\n        soldAt\n        currency\n        amount\n      }\n      id\n      launchedAt\n      status\n      createdAt\n    }\n  }\n'
): (typeof documents)['\n  query GetAllProducts {\n    getProducts {\n      productName\n      productMoto\n      price {\n        soldAt\n        currency\n        amount\n      }\n      id\n      launchedAt\n      status\n      createdAt\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
