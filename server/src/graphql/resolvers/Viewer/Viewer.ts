import { IResolvers } from 'apollo-server-express';
import { Request, Response } from 'express';
import crypto from 'crypto';
import { Viewer } from '../../../lib/types';
import { LogInArgs } from './types';
import { Prisma, User } from '../../../__generated__/prisma-client';
import { Google } from '../../../lib/api';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: !(process.env.NODE_ENV === 'development')
};

const logInViaGoogle = async (
  code: string,
  token: string,
  prisma: Prisma,
  res: Response
): Promise<User | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error(`Google login error`);
  }

  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;

  const userName = userNamesList ? userNamesList[0].displayName : null;
  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
  const userEmail =
    userEmailList && userEmailList[0].value ? userEmailList[0].value : null;

  if (!userName || !userId || !userAvatar || !userEmail) {
    throw new Error(`Google login error`);
  }

  let viewer;
  const userExists: boolean = await prisma.$exists.user({ id: userId });

  if (!userExists) {
    const insertRes = await prisma.createUser({
      id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail
    });

    viewer = insertRes;
  } else {
    const updateRes = await prisma.updateUser({
      where: { id: userId },
      data: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token
      }
    });

    viewer = updateRes;
  }
  res.cookie('viewer', userId, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000
  });

  return viewer;
};

const logInViaCookie = async (
  token: string,
  prisma: Prisma,
  req: Request,
  res: Response
): Promise<User | undefined> => {
  if (!req.signedCookies.viewer) {
    return undefined;
  }

  const updateRes = await prisma.updateUser({
    data: { token },
    where: { id: req.signedCookies.viewer }
  });

  const viewer = updateRes;

  if (!viewer) {
    res.clearCookie('viewer', cookieOptions);
  }

  return viewer;
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
      }
    }
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { prisma, req, res }: { prisma: Prisma; req: Request; res: Response }
    ): Promise<Viewer> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString('hex');
        const viewer: User | undefined = code
          ? await logInViaGoogle(code, token, prisma, res)
          : await logInViaCookie(token, prisma, req, res);

        if (!viewer) {
          return { projects: [], didRequest: true };
        }

        const projects = await prisma.user({ id: viewer.id }).projects();

        return {
          id: viewer.id,
          avatar: viewer.avatar,
          token: viewer.token,
          projects,
          didRequest: true
        };
      } catch (error) {
        throw new Error(`Failed to login: ${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ): Viewer => {
      try {
        res.clearCookie('viewer', cookieOptions);
        return { projects: [], didRequest: true };
      } catch (error) {
        throw new Error(`Failed to logout: ${error}`);
      }
    }
  }
};
