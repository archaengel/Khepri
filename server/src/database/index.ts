import 'dotenv/config';

import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

const url = process.env.DATABASE_URL;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db('main');

  return {
    users: db.collection('users'),
    projects: db.collection('projects'),
    issues: db.collection('issues')
  };
};
