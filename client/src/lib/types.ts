export interface Viewer {
  id: string | null;
  token: string | null;
  avatar: string | null;
  projects: Project[];
  didRequest: boolean;
}

export interface Project {
  id: string;
  name: string;
}
