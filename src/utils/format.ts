const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-amber-400",
  Python: "bg-sky-600",
  HTML: "bg-orange-500",
  CSS: "bg-indigo-500",
  SCSS: "bg-pink-500",
  Java: "bg-red-600",
  "C#": "bg-emerald-600",
  "C++": "bg-rose-500",
  C: "bg-slate-600",
  Go: "bg-cyan-500",
  Rust: "bg-orange-700",
  PHP: "bg-violet-500",
  Ruby: "bg-red-500",
  Swift: "bg-orange-500",
  Kotlin: "bg-purple-500",
  Dart: "bg-teal-500",
  Shell: "bg-lime-600",
  Vue: "bg-emerald-500",
};

/**
 * Formats an ISO 8601 date string into a human-readable date (and optional time).
 */
export function formatDate(isoDate: string, includeTime = false): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(includeTime
      ? {
          hour: "numeric",
          minute: "2-digit",
        }
      : {}),
  }).format(date);
}

/**
 * Ensures an external URL includes an http/https protocol.
 */
export function normalizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Formats integer counts with locale separators.
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Returns a Tailwind background color class for a programming language indicator.
 */
export function getLanguageColor(language: string | null): string {
  if (!language) {
    return "bg-slate-400";
  }
  return LANGUAGE_COLORS[language] ?? "bg-slate-400";
}

