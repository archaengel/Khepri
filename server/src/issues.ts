import { users } from './users';
import { User } from './lib/types';
import { ObjectId, DBRef } from 'mongodb';

const issueTemplate = {
  title: 'User can login',
  content: 'As a user ...',
  status: 'backlog'
};

export const issues = users.map((u: User) => ({
  ...issueTemplate,
  authorId: u._id,
  _id: new ObjectId()
}));
