export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  type: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export type RepoSortOption = "updated" | "stars" | "forks" | "name";

