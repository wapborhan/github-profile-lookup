import type { GitHubUser } from "../../types/github";
import { formatDate, formatNumber, normalizeUrl } from "../../utils/format";
import {
  AtSignIcon,
  BuildingIcon,
  CalendarIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapPinIcon,
} from "../ui/Icons";

interface ProfileCardProps {
  profile: GitHubUser;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const blogUrl = profile.blog ? normalizeUrl(profile.blog) : "";
  const twitterHandle = profile.twitter_username?.replace(/^@/, "") ?? "";

  const stats = [
    { label: "Followers", value: profile.followers },
    { label: "Following", value: profile.following },
    { label: "Public Repos", value: profile.public_repos },
    { label: "Public Gists", value: profile.public_gists },
  ];

  return (
    <aside className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:sticky lg:top-20 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col items-center text-center">
        <img
          src={profile.avatar_url}
          alt={`${profile.login} avatar`}
          className="h-28 w-28 rounded-full object-cover ring-4 ring-indigo-500/15 dark:ring-indigo-400/20"
        />
        <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {profile.name ?? profile.login}
        </h2>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          @{profile.login}
        </p>
        {profile.bio && (
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {profile.bio}
          </p>
        )}
      </div>

      <a
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      >
        <span>View GitHub Profile</span>
        <ExternalLinkIcon className="h-4 w-4" />
      </a>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-center dark:border-slate-800 dark:bg-slate-950/60"
          >
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {formatNumber(stat.value)}
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
        {profile.company && (
          <li className="flex items-start gap-2.5">
            <BuildingIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="break-words">{profile.company}</span>
          </li>
        )}

        {profile.location && (
          <li className="flex items-start gap-2.5">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="break-words">{profile.location}</span>
          </li>
        )}

        {blogUrl && (
          <li className="flex items-start gap-2.5">
            <GlobeIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {profile.blog}
            </a>
          </li>
        )}

        {twitterHandle && (
          <li className="flex items-start gap-2.5">
            <AtSignIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <a
              href={`https://x.com/${encodeURIComponent(twitterHandle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-indigo-600 hover:underline dark:text-indigo-400"
            >
              @{twitterHandle}
            </a>
          </li>
        )}

        <li className="flex items-start gap-2.5">
          <CalendarIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <span>Joined {formatDate(profile.created_at)}</span>
        </li>
      </ul>
    </aside>
  );
}

