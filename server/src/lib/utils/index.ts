import { Request } from 'express';
import { Prisma, User } from '../../__generated__/prisma-client';

export const authorize = async (
  prisma: Prisma,
  req: Request
): Promise<User | null> => {
  const token = req.get('X-CSRF-TOKEN');
  const viewers = await prisma.users({
    where: {
      AND: [{ token }, { id: req.signedCookies.viewer }]
    }
  });

  const viewer = viewers[0] ? viewers[0] : null;

  return viewer;
};
