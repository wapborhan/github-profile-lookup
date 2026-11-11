import { AlertCircleIcon, CloseIcon } from "./Icons";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="mb-6 flex items-start justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-200"
    >
      <div className="flex items-start gap-2.5">
        <AlertCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
        <span>{message}</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="rounded-md p-1 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/60"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

