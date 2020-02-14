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

export interface DeleteProjectArgs {
  input: DeleteProjectInput;
}

export interface DeleteProjectInput {
  id: string;
}
