# 🎬 Movies Search App

A modern, animated movie search application built with React that integrates with the OMDB API. Features glassmorphism design, smooth animations, and a cinematic UI.

## Features

- **Search** — Find movies, series, and episodes by title with real-time results
- **Type Filter** — Dropdown filter that queries the OMDB API by type (movie, series, episode)
- **Pagination** — Navigate through large result sets with numbered page controls
- **Movie Details** — Cinematic detail view with blurred poster backdrop, ratings, cast, plot, and more
- **Favorites** — Save and manage favorites (persisted in localStorage)
- **Animations** — Smooth page transitions, card hover effects, loading skeletons, and micro-interactions powered by Framer Motion
- **Responsive** — Fully responsive grid layout for all screen sizes

## Tech Stack

- **ReactJS** — UI library
- **React Router** — Client-side routing
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **OMDB API** — Movie data source
- **Vite** — Build tool

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Deployment (Netlify)

```bash
npm run build
```

Deploy the `dist/` folder to Netlify, or connect your GitHub repo for automatic deploys. The `public/_redirects` file handles SPA routing.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MovieCard.jsx    # Animated movie card with poster, type badge, favorite toggle
│   ├── Navbar.jsx       # Glass navigation bar with animated active tab
│   ├── Pagination.jsx   # Numbered pagination with page buttons
│   ├── SearchBar.jsx    # Glowing search input with type filter dropdown
│   └── SkeletonCard.jsx # Shimmer loading placeholder
├── context/
│   └── FavoritesContext.jsx  # Favorites state with localStorage persistence
├── pages/
│   ├── FavoritesPage.jsx     # Favorites grid view
│   ├── MovieDetailsPage.jsx  # Cinematic detail page with blurred backdrop
│   └── SearchPage.jsx        # Main search page with results grid
├── services/
│   └── omdbApi.js       # OMDB API integration (search + details)
├── App.jsx              # Root component with routing
├── main.jsx             # Entry point
└── index.css            # Global styles, glass effects, animations
```

## API

Uses the [OMDB API](https://www.omdbapi.com/) for fetching movie data. The type filter uses the API's `type` parameter directly — no client-side array filtering.
