import { ObjectId } from 'mongodb';
import { User } from './lib/types';

export const users: User[] = [
  {
    _id: new ObjectId(),
    name: '1134 1258'
  },
  {
    _id: new ObjectId(),
    name: 'Sting Da Blade'
  },
  {
    _id: new ObjectId(),
    name: 'Darth Vader'
  }
];
