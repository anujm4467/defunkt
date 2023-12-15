export interface IGitHubRepo {
  id: number;
  node_id?: string;
  name?: string;
  full_name?: string;
  private?: boolean;
  url?: string;
  forks_url?: string;
  keys_url?: string;
  collaborators_url?: string;
  teams_url?: string;
  hooks_url?: string;
  issue_events_url?: string;
  events_url?: string;
  assignees_url?: string;
  branches_url?: string;
  tags_url?: string;
  blobs_url?: string;
  downloads_url?: string;
}
