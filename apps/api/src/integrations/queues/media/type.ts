import { ProductService } from '@api/services/product';
import { UserService } from '@api/services/users';
import { MediaConfig } from '@prisma/client';

export type MessageQueueInput = Partial<
  MediaConfig & {
    collection: string;
    entity: string;
    mediaKeyName;
  }
>;

export const Service = {
  PRODUCT: ProductService,
  USER: UserService,
};
