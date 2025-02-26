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
        tags
        status
        launchedAt
        id
        productDescription
        productMoto
        productName
        media {
          productCover {
            config {
              area {
                height
                width
                x
                y
              }
              fileName
              metadata {
                crop {
                  y
                  x
                }
                zoom
                rotate
              }
            }
            current
            raw
          }
          productLogo {
            raw
            current
            config {
              metadata {
                zoom
                crop {
                  y
                  x
                }
                rotate
              }
              fileName
              area {
                y
                x
                width
                height
              }
            }
          }
        }
        userId
      }
      productId
    }
  }
`);
