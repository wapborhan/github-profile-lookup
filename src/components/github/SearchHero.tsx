import type { FormEvent } from "react";
import { CloseIcon, GitHubIcon, SearchIcon } from "../ui/Icons";

const SUGGESTED_USERS = ["torvalds", "gaearon", "yyx990803", "wapborhan"];

interface SearchHeroProps {
  username: string;
  loading: boolean;
  onUsernameChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onQuickSelect: (handle: string) => void;
}

export default function SearchHero({
  username,
  loading,
  onUsernameChange,
  onSubmit,
  onQuickSelect,
}: SearchHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-indigo-50/70 p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub REST API v3
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Search GitHub Profiles
          </h1>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Inspect any developer&apos;s public GitHub profile, stats, and all owned
            repositories in one clean view.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          <form onSubmit={onSubmit} className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                id="searchUser"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                placeholder="Enter GitHub username..."
                aria-label="GitHub username"
                autoComplete="off"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-9 pl-10 text-sm text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
              {username && (
                <button
                  type="button"
                  onClick={() => onUsernameChange("")}
                  aria-label="Clear search input"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              id="searchBtn"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-900"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Searching...</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span>Try:</span>
            {SUGGESTED_USERS.map((handle) => (
              <button
                key={handle}
                type="button"
                onClick={() => onQuickSelect(handle)}
                className="rounded-lg border border-slate-200 bg-white/80 px-2.5 py-1 font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
              >
                @{handle}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

