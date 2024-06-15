export class GQLProductTypeDefs {
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
      enum ProductPriceCurrency {
        USD
        INR
      }
      enum ProductStatus {
        IDLE
        COMING_SOON
        LAUNCHED
        SOLD
      }
    `;
  public static types = `#graphql
      type ProductPrice {
        amount:Float
        currency:ProductPriceCurrency
        soldAt:Float
      }

      type MediaCropConfigCoords {
        x:Float
        y:Float
      }

      type MediaCropMetaData {
        crop:MediaCropConfigCoords
        zoom:Float
        rotate:Float
      }

      type MediaCropArea {
        width:Float
        height:Float
        x:Float
        y:Float
      }

      type Config {
        fileName:String
        metadata:MediaCropMetaData
        area:MediaCropArea
      }

      type MediaConfig {
        raw:String
        current:String
        config:Config
      }

      type ProductMedia {
        productLogo:MediaConfig
        productCover:MediaConfig
      }

      type Product {
        id:ID
        productName:String
        productMoto:String
        productDescription:String
        media:ProductMedia
        tags:[InterestsType]
        price:ProductPrice
        status:ProductStatus
        createdAt:String
        updatedAt:String
        launchedAt:String
        createdBy:String
        updatedBy:String
        userId:String
        shots: [Shot]
        user: User
      }
    `;
  public static root = 'Product';
}
