import { gql } from '@client/__generated__';

export const SUBSCRIBE_TO_NEW_SHOT_SUBSCRIPTION = gql(/* GraphQL */ `
  subscription Subscription {
    lauchShot {
      id
      launchedAt
      media
      productType
      votes
      content
      title
    }
  }
`);
