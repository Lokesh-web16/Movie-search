# 🎬 Movie Search App

A modern, animated **Movie Search Application** built with **React**, **Tailwind CSS** and **Framer Motion**. Search movies, explore details and manage your favorites, all wrapped in a cinematic glassmorphism UI

---

## 🌐 Live Demo

🔗 **[Visit the App Here](#)**

---

## 📸 Preview

### 🏠 Home Page
- Curated trending sections loaded on startup
- Glassmorphism search bar with glowing gradient effect
- Animated scrolling film strip footer
- Responsive 5-column movie grid

### 🔍 Search Results
- Real-time search with type filtering via OMDB API
- Staggered card entrance animations
- Numbered pagination with page indicators
- Shimmer loading skeletons while fetching

### 🎥 Movie Details
- Cinematic blurred poster backdrop
- Genre pills, rating cards, and cast chips
- Full plot summary, director, writer, and box office info
- Animated favorite toggle with spring physics

### ❤️ Favorites
- Persistent favorites saved to localStorage
- One-click add/remove from any page
- Badge counter in the navigation bar

---

## 🎮 How to Use

| Step | Action |
| :--- | :--- |
| 1️⃣ | **Search** for any movie, series or TV episode using the search bar |
| 2️⃣ | Use the **dropdown filter** to narrow results by type (Movies, Series, TV Episodes) |
| 3️⃣ | **Browse** through paginated results in the responsive grid |
| 4️⃣ | **Click** on any card to view full movie details |
| 5️⃣ | Hit the **heart icon** ❤️ to save movies to your favorites |
| 6️⃣ | Visit the **Favorites** page to see all your saved picks |

---

## ✨ Features

- 🔍 **Smart Search** — Search by title with instant results from OMDB API
- 🎛️ **Type Filter** — Dropdown filter using API endpoint (movie, series, episode)
- 📄 **Pagination** — Numbered page navigation for large result sets
- 🎥 **Movie Details** — Full info: poster, plot, cast, ratings, genre, box office and more
- ❤️ **Favorites System** — Add/remove favorites, persisted in localStorage
- 🔥 **Trending Sections** — Curated movie & series rows on the home page
- 💀 **Skeleton Loading** — Shimmer placeholders while content loads
- 🎨 **Glassmorphism UI** — Frosted glass cards with gradient glows
- 🎞️ **Animations** — Smooth transitions, hover effects and micro-interactions
- 📱 **Fully Responsive** — Optimized for Desktop, Tablet and Mobile
- ⚡ **Fast Loading** — All trending data fetched in parallel
- 🚫 **No `array.filter()`** — Uses `reduce()` for all filtering logic per project requirements

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | UI library and component architecture |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Client-side routing and navigation |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Utility-first styling and responsive design |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | Animations, transitions and gestures |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Application logic and API integration |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tool and dev server |
| ![OMDB API](https://img.shields.io/badge/OMDB_API-003B6F?style=flat-square&logo=imdb&logoColor=white) | Movie data source |

---

## 📁 Project Structure

```text
movies-search-app/
│
├── public/
│   ├── _redirects          # Netlify SPA routing
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── Footer.jsx      # Animated scrolling film strip footer
│   │   ├── MovieCard.jsx   # Movie card with poster, type badge, favorite toggle
│   │   ├── Navbar.jsx      # Glass navbar with animated active tab indicator
│   │   ├── Pagination.jsx  # Numbered pagination with prev/next controls
│   │   ├── SearchBar.jsx   # Glowing search input with type filter dropdown
│   │   └── SkeletonCard.jsx # Shimmer loading placeholder card
│   │
│   ├── context/
│   │   └── FavoritesContext.jsx  # React Context for favorites with localStorage
│   │
│   ├── pages/
│   │   ├── FavoritesPage.jsx     # Favorites grid view
│   │   ├── MovieDetailsPage.jsx  # Cinematic detail page with blurred backdrop
│   │   └── SearchPage.jsx        # Home page with trending + search results
│   │
│   ├── services/
│   │   └── omdbApi.js       # OMDB API service (search + details)
│   │
│   ├── App.jsx              # Root component with routing setup
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles, glass effects, animations
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/Lokesh-web16/Movie-search.git
```

2. Navigate into the folder:
```bash
cd Movie-search
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open in your browser:
```
http://localhost:5173
```

---

## 🔌 API Integration

| Endpoint | Purpose | Parameters |
| :--- | :--- | :--- |
| `?s=query` | Search movies by title | `s`, `page`, `type` |
| `?i=imdbID` | Get full movie details | `i`, `plot=full` |

- The **type filter** uses the OMDB API's `type` parameter directly — no client-side `array.filter()` is used anywhere
- Error messages are **type-aware** (e.g. "Series not found!" when filtering by series)
- All API calls include proper error handling for network failures and empty results

---


## 📱 Responsive Breakpoints

| Device | Screen Width | Grid Columns | Status |
| :--- | :--- | :--- | :--- |
| 🖥️ **Desktop** | `> 1024px` | 5 columns | ✅ |
| 💻 **Laptop** | `> 768px` | 4 columns | ✅ |
| 📱 **Tablet** | `> 640px` | 3 columns | ✅ |
| 📱 **Mobile** | `≤ 640px` | 2 columns | ✅ |

---

## 📝 Key Components & Functions

> Core architecture of the application:

- **`omdbApi.js`** — API service layer with `searchMovies()` and `getMovieDetails()` functions, type-aware error handling
- **`FavoritesContext.jsx`** — React Context provider with `addFavorite()`, `removeFavorite()`, `isFavorite()` — persisted to localStorage
- **`SearchPage.jsx`** — Home page with parallel-loaded trending sections and paginated search results
- **`MovieDetailsPage.jsx`** — Cinematic detail view with blurred backdrop, ratings, cast chips, and genre pills
- **`MovieCard.jsx`** — Animated card component with type badge, poster hover zoom, and favorite toggle
- **`SearchBar.jsx`** — Glowing search input with type filter dropdown, reactive focus glow
- **`Pagination.jsx`** — Smart numbered pagination with ellipsis for large page counts
- **`Footer.jsx`** — Animated scrolling film strip with gradient glow border

---

## 📄 License

This project is open-source and available under the **MIT License**.
