export class GQLShotTypeDefs {
  public static enums = `#graphql
    enum ShotStatus {
      IDLE
      SCHEDULED
      SHOOT
      DELETED
    }

    enum CreationMethod {
      GEN_AI
      MANUAL
    }

    `;
  public static types = `#graphql
      # scalar Date
      type Shot {
        id:ID
        title:String
        content:String
        productType:ProductStatus
        status:ShotStatus
        votes:Int
        media:[String]
        launchedAt:Int
        creationMethod:CreationMethod
        createdAt:String
        updatedAt:String
        createdBy:String
        updatedBy:String
        productId:String
        product:Product
        tweet:Boolean
        isArchived:Boolean
      }

      input ShotInput{
        id:ID
        title:String
        content:String
        productType:String
        status:String
        votes:Int
        media:[String]
        launchedAt:Int
        creationMethod:String
        createdAt:String
        updatedAt:String
        createdBy:String
        updatedBy:String
        productId:String
      }

    `;
  public static root = 'Shot';
}
