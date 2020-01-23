import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { resolve } from 'path';
import { projects } from './projects';

const nodeEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

app.use(express.static(resolve(__dirname, '..', '..', 'client', 'build')));

app.get('/projects', (_req, res) => {
  res.json(projects);
});

app.get('/:code', (_req, res) => {
  res.sendFile(resolve(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

app.get('*', (_req: any, res: any) => {
  res.sendFile(resolve(__dirname, '..', '..', 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`[app]: Now listening on ${port}`));
