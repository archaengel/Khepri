import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { resolve } from 'path';
import { projects } from './projects';
import { connectDatabase } from './database';
import { Database } from './lib/types';

const nodeEnv = process.env.NODE_ENV || 'development';

const mount = async (app: Application): Promise<void> => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (): { db: Database } => ({ db })
  });
  server.applyMiddleware({ app, path: '/api' });

  app.use(express.static(resolve(__dirname, '..', '..', 'client', 'build')));

  app.get('/projects', (_req: express.Request, res: express.Response) => {
    res.json(projects);
  });

  app.get('/:code', (_req: express.Request, res: express.Response) => {
    res.sendFile(
      resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });

  app.get('/', (_req: express.Request, res: express.Response) => {
    res.sendFile(
      resolve(__dirname, '..', '..', 'client', 'build', 'index.html')
    );
  });

  app.listen(process.env.PORT);
  console.log(`[app]: Now listening on ${process.env.PORT}`);
};

mount(express());
