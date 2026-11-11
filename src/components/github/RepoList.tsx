import { useMemo, useState } from "react";
import type { GitHubRepo, RepoSortOption } from "../../types/github";
import { formatNumber } from "../../utils/format";
import { SearchIcon } from "../ui/Icons";
import RepoCard from "./RepoCard";

interface RepoListProps {
  repos: GitHubRepo[];
  username: string;
  totalPublicRepos: number;
}

const REPOS_PER_PAGE = 8;

export default function RepoList({
  repos,
  username,
  totalPublicRepos,
}: RepoListProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [sortBy, setSortBy] = useState<RepoSortOption>("updated");
  const [currentPage, setCurrentPage] = useState(1);

  const languages = useMemo(() => {
    const unique = new Set<string>();
    for (const repo of repos) {
      if (repo.language) {
        unique.add(repo.language);
      }
    }
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const filteredAndSortedRepos = useMemo(() => {
    const query = filterQuery.trim().toLowerCase();

    const filtered = repos.filter((repo) => {
      const matchesLanguage =
        selectedLanguage === "all" || repo.language === selectedLanguage;
      if (!matchesLanguage) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        repo.name.toLowerCase().includes(query) ||
        (repo.description?.toLowerCase().includes(query) ?? false)
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        case "name":
          return a.name.localeCompare(b.name);
        case "updated":
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });
  }, [repos, filterQuery, selectedLanguage, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedRepos.length / REPOS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRepos = filteredAndSortedRepos.slice(
    (safePage - 1) * REPOS_PER_PAGE,
    safePage * REPOS_PER_PAGE
  );

  const handleFilterChange = (value: string) => {
    setFilterQuery(value);
    setCurrentPage(1);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: RepoSortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const goToPage = (nextPage: number) => {
    setCurrentPage(nextPage);
    document.getElementById("repos-section")?.scrollIntoView({ behavior: "smooth" });
  };

  if (repos.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200/80 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-base font-medium text-slate-700 dark:text-slate-200">
          @{username} has no public repositories yet.
        </p>
      </section>
    );
  }

  return (
    <section id="repos-section" className="scroll-mt-20 space-y-4">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Public Repositories
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing {formatNumber(filteredAndSortedRepos.length)} of{" "}
              {formatNumber(repos.length)} repositories
              {totalPublicRepos > repos.length
                ? ` (${formatNumber(totalPublicRepos)} total on GitHub)`
                : ""}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => handleFilterChange(e.target.value)}
                placeholder="Filter repositories..."
                aria-label="Filter repositories"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-48 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-950"
              />
            </div>

            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              aria-label="Filter by programming language"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="all">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as RepoSortOption)}
              aria-label="Sort repositories"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="forks">Most Forks</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {paginatedRepos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            No repositories match your current filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilterQuery("");
              setSelectedLanguage("all");
              setCurrentPage(1);
            }}
            className="mt-3 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          aria-label="Repository pagination"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Page <span className="font-semibold text-slate-900 dark:text-white">{safePage}</span> of{" "}
            <span className="font-semibold text-slate-900 dark:text-white">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => goToPage(Math.max(1, safePage - 1))}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </nav>
      )}
    </section>
  );
}

