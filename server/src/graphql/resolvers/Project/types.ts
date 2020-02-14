export interface UpdateProjectStatusesArgs {
  input: UpdateProjectStatusesInput;
}

export interface UpdateProjectStatusesInput {
  projectId: string;
  statuses: string[];
}

export interface CreateProjectArgs {
  input: CreateProjectInput;
}

export interface CreateProjectInput {
  name: string;
}
