import prisma from '@api/integrations/prisma';

const queries = {
  getUsers: async () => {
    const users = await prisma.user.findMany();
    return users;
  },
};

export class GQLUserResolver {
  static queries = queries;
}
