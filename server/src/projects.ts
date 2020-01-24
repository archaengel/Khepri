import { issues } from './issues';
import { Issue, Project } from './lib/types';
import { users } from './users';
import { ObjectId } from 'mongodb';

export const projects: Project[] = [
  {
    name: 'TradRack.io',
    _id: new ObjectId(),
    issueIds: issues.map((i: Issue) => i._id),
    leadId: users[0]._id
  },
  {
    name: 'DeathStar',
    _id: new ObjectId(),
    issueIds: issues.map((i: Issue) => i._id),
    leadId: users[1]._id
  },
  {
    name: 'Mordor Walk',
    _id: new ObjectId(),
    issueIds: issues.map((i: Issue) => i._id),
    leadId: users[2]._id
  }
];
