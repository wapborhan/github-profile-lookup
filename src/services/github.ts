import type { GitHubRepo, GitHubUser } from "../types/github";

const GITHUB_API_BASE = "https://api.github.com";
const PER_PAGE = 100;
const MAX_REPO_PAGES = 10;

const DEFAULT_HEADERS: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
};

export interface GitHubSearchResult {
  profile: GitHubUser;
  repos: GitHubRepo[];
}

async function parseGitHubError(response: Response, username: string): Promise<string> {
  if (response.status === 404) {
    return `GitHub user "${username}" was not found.`;
  }

  if (response.status === 403 || response.status === 429) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    if (remaining === "0") {
      return "GitHub API rate limit exceeded. Please wait a bit and try again.";
    }
    return "Access denied by the GitHub API. Please try again shortly.";
  }

  try {
    const payload = (await response.json()) as { message?: string };
    if (payload?.message) {
      return payload.message;
    }
  } catch {
    // Fall back to status text when body isn't JSON
  }

  return `Request failed with status ${response.status}.`;
}

async function fetchRepoPage(
  encodedUsername: string,
  rawUsername: string,
  page: number,
  signal?: AbortSignal
): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${encodedUsername}/repos?page=${page}&per_page=${PER_PAGE}&sort=created&type=owner`,
    { headers: DEFAULT_HEADERS, signal }
  );

  if (!response.ok) {
    throw new Error(await parseGitHubError(response, rawUsername));
  }

  return (await response.json()) as GitHubRepo[];
}

function deduplicateRepos(repos: GitHubRepo[]): GitHubRepo[] {
  const seen = new Map<number, GitHubRepo>();
  for (const repo of repos) {
    if (!seen.has(repo.id)) {
      seen.set(repo.id, repo);
    }
  }
  return Array.from(seen.values());
}

/**
 * Fetches a GitHub user's profile and all public owned repositories across paginated requests.
 */
export async function fetchGitHubUserAndRepos(
  username: string,
  signal?: AbortSignal
): Promise<GitHubSearchResult> {
  const cleanUsername = username.trim();
  if (!cleanUsername) {
    throw new Error("Please enter a GitHub username.");
  }

  const encoded = encodeURIComponent(cleanUsername);
  const [profileRes, page1Repos] = await Promise.all([
    fetch(`${GITHUB_API_BASE}/users/${encoded}`, {
      headers: DEFAULT_HEADERS,
      signal,
    }),
    fetchRepoPage(encoded, cleanUsername, 1, signal),
  ]);

  if (!profileRes.ok) {
    throw new Error(await parseGitHubError(profileRes, cleanUsername));
  }

  const profile = (await profileRes.json()) as GitHubUser;

  if (page1Repos.length < PER_PAGE) {
    return { profile, repos: page1Repos };
  }

  const totalPages = Math.min(
    MAX_REPO_PAGES,
    Math.max(2, Math.ceil(profile.public_repos / PER_PAGE))
  );

  const remainingPageNumbers = Array.from(
    { length: totalPages - 1 },
    (_, index) => index + 2
  );

  const remainingPages = await Promise.all(
    remainingPageNumbers.map((page) =>
      fetchRepoPage(encoded, cleanUsername, page, signal)
    )
  );

  const allRepos = deduplicateRepos([
    ...page1Repos,
    ...remainingPages.flat(),
  ]);

  return { profile, repos: allRepos };
}
