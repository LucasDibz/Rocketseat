import prismaClient from '../../prisma';

export function GetLast3MessagesService() {
  return {
    async execute() {
      const messages = await prismaClient.message.findMany({
        take: 3,
        orderBy: {
          created_at: 'desc',
        },
        include: {
          user: true,
        },
      });

      return messages;
    },
  };
}
