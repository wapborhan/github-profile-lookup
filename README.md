# GitHub Profile Lookup

A React + TypeScript + Tailwind CSS v4 web application for searching GitHub users and exploring their public profile details and repositories via the GitHub REST API v3.

## Features

- **TypeScript + React 19**: Strictly typed GitHub API models (`GitHubUser`, `GitHubRepo`) and native `fetch` service with request cancellation and clear error handling (404 & rate-limit feedback).
- **Tailwind CSS v4 UI**: Responsive layout with light/dark theme toggle (persisted in `localStorage`), loading skeletons, and sticky profile sidebar.
- **Repository Explorer**: Filter repositories by keyword or language, sort by recently updated, stars, forks, or name, and navigate with client-side pagination.
- **Shareable Searches**: Syncs the searched username with the `?user=` URL query parameter.

## Scripts

- `npm run dev` — Start the Vite development server
- `npm run lint` — Run ESLint across the project
- `npm run build` — Type-check with `tsc -b` and build for production with Vite
- `npm run preview` — Preview the production build locally
