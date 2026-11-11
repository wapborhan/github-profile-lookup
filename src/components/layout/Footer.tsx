import { HeartIcon } from "../ui/Icons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8 dark:text-slate-400">
        <p>© WapBorhan. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span>Designed with</span>
          <HeartIcon className="h-4 w-4 text-rose-500" />
          <span>by</span>
          <a
            href="https://www.wapborhan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Borhan Uddin
          </a>
        </p>
      </div>
    </footer>
  );
}

