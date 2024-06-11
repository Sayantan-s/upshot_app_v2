import { gql } from '@client/__generated__';

export const FETCH_SHOTS_FEED_QUERY = gql(/* GraphQL */ `
  query GetShots {
    getShots {
      id
      launchedAt
      media
      productType
      votes
      content
      title
      product {
        user {
          firstName
          lastName
          about
          coverPic
          userName
          profilePic
          location
          id
        }
      }
    }
  }
`);
