import { GitHubIcon } from "./Icons";

export default function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
        <GitHubIcon className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
        Ready to explore GitHub
      </h2>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-500 dark:text-slate-400">
        Enter a GitHub username above or pick one of the suggested developers to view
        their profile details and filterable public repositories.
      </p>
    </div>
  );
}

