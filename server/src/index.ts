import express, { Request, Response, Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import { resolvers, typeDefs } from './graphql';
import { resolve } from 'path';
import { prisma, Prisma } from './__generated__/prisma-client';

interface ApolloContext {
  prisma: Prisma;
  req: Request;
  res: Response;
}

const mount = async (app: Application): Promise<void> => {
  app.use(cookieParser(process.env.SECRET));
  app.use(express.static(resolve(__dirname, '..', '..', 'client', 'build')));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }): ApolloContext => ({
      prisma,
      req,
      res
    })
  });

  server.applyMiddleware({ app, path: '/api' });
  app.get('/*', (_req: Request, res: Response) => {
    res.sendFile(
      resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });
  app.listen(process.env.PORT || 5000);
  console.log(`[app]: Now listening on ${process.env.PORT || 5000}`);
};

mount(express());
