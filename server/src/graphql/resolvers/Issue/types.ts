export interface CreateIssueInput {
  title: string;
  content: string;
  status: string;
  projectId: string;
}

export interface CreateIssueArgs {
  input: CreateIssueInput;
}

export interface UpdateIssueInput {
  id: string;
  title: string;
  content: string;
  status: string;
}

export interface UpdateIssueArgs {
  input: UpdateIssueInput;
}

export interface DeleteIssueInput {
  id: string;
}

export interface DeleteIssueArgs {
  input: DeleteIssueInput;
}
