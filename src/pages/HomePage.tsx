import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import ProfileCard from "../components/github/ProfileCard";
import ProfileSkeleton from "../components/github/ProfileSkeleton";
import RepoList from "../components/github/RepoList";
import SearchHero from "../components/github/SearchHero";
import BackToTop from "../components/layout/BackToTop";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import EmptyState from "../components/ui/EmptyState";
import ErrorBanner from "../components/ui/ErrorBanner";
import { fetchGitHubUserAndRepos } from "../services/github";
import type { GitHubRepo, GitHubUser } from "../types/github";

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark") {
    return true;
  }
  if (stored === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getInitialUsernameFromUrl(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return new URLSearchParams(window.location.search).get("user")?.trim() ?? "";
}

function updateUrlUsername(username: string): void {
  if (typeof window === "undefined") {
    return;
  }
  const url = new URL(window.location.href);
  if (username) {
    url.searchParams.set("user", username);
  } else {
    url.searchParams.delete("user");
  }
  window.history.replaceState({}, "", url.toString());
}

export default function HomePage() {
  const [isDark, setIsDark] = useState<boolean>(getInitialDarkMode);
  const [initialUsername] = useState(getInitialUsernameFromUrl);
  const [username, setUsername] = useState(initialUsername);
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState(Boolean(initialUsername));
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (!initialUsername) {
      return () => {
        abortControllerRef.current?.abort();
      };
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    fetchGitHubUserAndRepos(initialUsername, controller.signal)
      .then((result) => {
        setProfile(result.profile);
        setRepos(result.repos);
        setError(null);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setProfile(null);
        setRepos(null);
        setError(
          err instanceof Error ? err.message : "Failed to load GitHub profile data."
        );
      })
      .finally(() => {
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [initialUsername]);

  const performSearch = async (targetUsername: string) => {
    const trimmed = targetUsername.trim();
    if (!trimmed) {
      setError("Please enter a GitHub username.");
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    updateUrlUsername(trimmed);

    try {
      const result = await fetchGitHubUserAndRepos(trimmed, controller.signal);
      setProfile(result.profile);
      setRepos(result.repos);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      setProfile(null);
      setRepos(null);
      setError(
        err instanceof Error ? err.message : "Failed to load GitHub profile data."
      );
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void performSearch(username);
  };

  const handleQuickSelect = (handle: string) => {
    setUsername(handle);
    void performSearch(handle);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <SearchHero
          username={username}
          loading={loading}
          onUsernameChange={setUsername}
          onSubmit={handleSubmit}
          onQuickSelect={handleQuickSelect}
        />

        <div className="mt-8">
          {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

          {loading && <ProfileSkeleton />}

          {!loading && profile && repos && (
            <div id="profile" className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4 xl:col-span-3">
                <ProfileCard profile={profile} />
              </div>
              <div className="lg:col-span-8 xl:col-span-9">
                <RepoList
                  key={profile.id}
                  repos={repos}
                  username={profile.login}
                  totalPublicRepos={profile.public_repos}
                />
              </div>
            </div>
          )}

          {!loading && !profile && !error && <EmptyState />}
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

