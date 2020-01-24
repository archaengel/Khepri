import { Collection, ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
}

export interface Issue {
  title: string;
  content: string;
  authorId: ObjectId;
  _id: ObjectId;
  status: string;
}

export interface Project {
  name: string;
  _id: ObjectId;
  issueIds: ObjectId[];
  leadId: ObjectId;
}

export interface Database {
  users: Collection<User>;
  issues: Collection<Issue>;
  projects: Collection<Project>;
}
