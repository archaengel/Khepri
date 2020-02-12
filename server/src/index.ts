import express, { Request, Response, Application, request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import { resolvers, typeDefs } from './graphql';
import { resolve } from 'path';
import { prisma, Prisma } from './__generated__/prisma-client';

const SECRET = process.env.SECRET;
const PORT = process.env.PORT;

interface ApolloContext {
  prisma: Prisma;
  req: Request;
  res: Response;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }): ApolloContext => ({
    prisma,
    req,
    res
  })
});

export const configureMiddleware = (app: Application): Application => {
  app.use(cookieParser(SECRET));
  app.use(express.static(resolve(__dirname, '..', '..', 'client', 'build')));

  server.applyMiddleware({ app, path: '/api' });
  app.get('/*', (_req: Request, res: Response) => {
    res.sendFile(
      resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });

  return app;
};

const mount = async (app: Application): Promise<void> => {
  configureMiddleware(app);
  app.listen(PORT);
  console.log(`[app]: Now listening on ${PORT}`);
};

// Check if this file is main process
const isModule = (main: NodeModule): boolean => module === main;

// Start server if this file is main process
if (require.main) {
  isModule(require.main) ? mount(express()) : null;
}
