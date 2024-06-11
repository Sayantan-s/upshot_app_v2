export class GQLUserTypeDefs {
  public static enums = `#graphql
      enum InterestsType {
        PT
        MT
        AI
        FT
        ET
        OSS
        DTT
        SaaS
      }

    `;
  public static types = `#graphql
      # scalar Date
      type User {
        id:ID!
        email:String!
        newUser:Boolean
        userName:String
        pwd:String!
        refreshToken:String
        firstName:String!
        lastName:String!
        interests:[String]
        about:String
        profilePic:String
        coverPic:String
        location:String
        createdAt:String!
        updatedAt:String!
        createdBy:String!
        updatedBy:String!
        products: [Product]
      }
    `;
  public static root = 'User';
}
