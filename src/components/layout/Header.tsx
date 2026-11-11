import { useState } from "react";
import { CloseIcon, GitHubIcon, MenuIcon, MoonIcon, SunIcon } from "../ui/Icons";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { label: "Projects", href: "https://wapborhan.com/#portfolio" },
  { label: "Contact", href: "https://wapborhan.com/#contacts" },
];

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="/"
          className="group flex items-center gap-2.5 text-slate-900 transition-opacity hover:opacity-90 dark:text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10 transition-transform group-hover:scale-105 dark:bg-indigo-600 dark:ring-indigo-400/20">
            <GitHubIcon className="h-5 w-5" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight">WapBorhan</span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              GitHub Explorer
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100/70 text-slate-700 transition-colors hover:bg-slate-200/80 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100/70 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

