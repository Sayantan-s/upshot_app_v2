import { gql } from '@client/__generated__';

export const UPDATE_SHOT_MUTATION = gql(/* GraphQL */ `
  mutation UpdateShot($shotId: ID!, $shotInput: ShotInput!) {
    updateShot(shotId: $shotId, shotInput: $shotInput)
  }
`);
