import type { GitHubRepo } from "../../types/github";
import {
  formatDate,
  formatNumber,
  getLanguageColor,
  normalizeUrl,
} from "../../utils/format";
import { ExternalLinkIcon, EyeIcon, ForkIcon, StarIcon } from "../ui/Icons";

interface RepoCardProps {
  repo: GitHubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const demoUrl = repo.homepage ? normalizeUrl(repo.homepage) : "";

  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/50">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-bold text-slate-900 dark:text-white">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <span className="truncate">{repo.name}</span>
                <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
              </a>
            </h3>

            {repo.fork && (
              <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Fork
              </span>
            )}

            {repo.archived && (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-300">
                Archived
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {repo.description || "No description provided."}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
            {repo.language && (
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                    repo.language
                  )}`}
                />
                {repo.language}
              </span>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-emerald-600 hover:underline dark:text-emerald-400"
              >
                <span>Live Demo</span>
                <ExternalLinkIcon className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 md:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <span
              title="Stars"
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200/80 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-300"
            >
              <StarIcon className="h-3.5 w-3.5" />
              <span>{formatNumber(repo.stargazers_count)}</span>
            </span>

            <span
              title="Watchers"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <EyeIcon className="h-3.5 w-3.5" />
              <span>{formatNumber(repo.watchers_count)}</span>
            </span>

            <span
              title="Forks"
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-300"
            >
              <ForkIcon className="h-3.5 w-3.5" />
              <span>{formatNumber(repo.forks_count)}</span>
            </span>
          </div>

          <div className="flex flex-col gap-0.5 text-xs text-slate-500 md:text-right dark:text-slate-400">
            <span>Created: {formatDate(repo.created_at, true)}</span>
            <span>Updated: {formatDate(repo.updated_at, true)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

