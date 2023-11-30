export class GQLPostTypeDefs {
  public static enums = `#graphql
    enum PostType {
        BUILD_IN_PUBLIC
        PRODUCT_SELL
    }
    `;
  public static types = `#graphql
    type Post{
        id: String
        type: PostType
        body: String
        updated_at: String
        created_at: String
        votes: Int
        comments: [Comments]
        link: String
        product_id_bip: String
        product_bip: Build_In_Public
        product_id_ps: String
        product_ps: Product_Sell
    }
    `;
}
