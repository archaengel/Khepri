import { Project as PrismaProject } from '../__generated__/prisma-client';

export interface Viewer {
  id?: string;
  avatar?: string;
  token?: string;
  projects: PrismaProject[];
  didRequest: boolean;
}

export interface Comment {
  author: User;
  id: string;
  content: string;
  issues: Issue;
}

export interface Issue {
  id: string;
  title: string;
  content: string;
  status: string;
  author: User;
  project: Project;
  comments: Comment[];
}

export interface Project {
  name: string;
  id: string;
  issues: Issue[];
  lead: User;
}

export interface User {
  id: string;
  token?: string;
  contact: string;
  avatar: string;
  name: string;
  projects: Project[];
}
