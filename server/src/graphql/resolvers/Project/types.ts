export interface UpdateProjectStatusesArgs {
  input: UpdateProjectStatusesInput;
}

export interface UpdateProjectStatusesInput {
  projectId: string;
  statuses: string[];
}
