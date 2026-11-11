export default function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4 xl:col-span-3">
        <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto h-28 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mx-auto mt-4 h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mx-auto mt-2 h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <div className="h-14 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-14 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-14 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-14 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>

      <div className="space-y-3 lg:col-span-8 xl:col-span-9">
        <div className="h-20 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          />
        ))}
      </div>
    </div>
  );
}

