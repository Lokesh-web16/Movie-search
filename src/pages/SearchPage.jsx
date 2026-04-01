import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";
import { searchMovies } from "../services/omdbApi";

/**
 * Each section uses multiple specific queries to get diverse, unique results.
 * We fetch several single-title searches and combine them into one section.
 */
const TRENDING_SECTIONS = [
  {
    title: "🔥 Trending Movies",
    type: "movie",
    queries: ["Oppenheimer", "Barbie", "Dune", "Spider-Man", "Avatar", "Top Gun", "John Wick"],
  },
  {
    title: "📺 Popular Series",
    type: "series",
    queries: ["Wednesday", "The Last of Us", "Squid Game", "Loki", "Peaky Blinders", "Dark", "Narcos"],
  },
  {
    title: "🎬 Classic Hits",
    type: "movie",
    queries: ["The Shawshank Redemption", "The Dark Knight", "Pulp Fiction", "Forrest Gump", "Fight Club", "The Matrix", "Gladiator"],
  },
];

/**
 * Pick only movies that have a valid poster and deduplicate by imdbID.
 * Uses reduce (not filter) per project requirements.
 */
function cleanResults(movies) {
  const seen = new Set();
  return movies.reduce((acc, movie) => {
    if (movie.Poster && movie.Poster !== "N/A" && !seen.has(movie.imdbID)) {
      seen.add(movie.imdbID);
      acc.push(movie);
    }
    return acc;
  }, []);
}

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  // Trending state
  const [trending, setTrending] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  // Load trending on mount
  useEffect(() => {
    let cancelled = false;
    async function loadTrending() {
      setTrendingLoading(true);
      // Fire ALL queries across ALL sections in parallel
      const allPromises = TRENDING_SECTIONS.map((section) => {
        const queryPromises = section.queries.map((q) =>
          searchMovies(q, 1, section.type)
            .then((data) => (data.Search && data.Search.length > 0 ? data.Search[0] : null))
            .catch(() => null)
        );
        return Promise.all(queryPromises).then((results) => {
          const collected = results.reduce((acc, m) => {
            if (m) acc.push(m);
            return acc;
          }, []);
          return collected.length > 0
            ? { title: section.title, movies: cleanResults(collected) }
            : null;
        });
      });

      const resolved = await Promise.all(allPromises);
      if (!cancelled) {
        const sections = resolved.reduce((acc, s) => {
          if (s) acc.push(s);
          return acc;
        }, []);
        setTrending(sections);
        setTrendingLoading(false);
      }
    }
    loadTrending();
    return () => { cancelled = true; };
  }, []);

  const fetchResults = useCallback(async (q, t, p) => {
    setLoading(true);
    setError("");
    try {
      const data = await searchMovies(q, p, t);
      setResults(data.Search);
      setTotalResults(Number(data.totalResults));
    } catch (err) {
      setResults([]);
      setTotalResults(0);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (q, t) => {
    setQuery(q);
    setType(t);
    setPage(1);
    setSearched(true);
    fetchResults(q, t, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchResults(query, type, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
          <span className="gradient-text">Find Your Next Watch</span>
        </h1>
        <p className="text-slate-500 text-lg">
          Search millions of movies, series and episodes
        </p>
      </motion.div>

      <SearchBar onSearch={handleSearch} initialQuery={query} initialType={type} />

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center mt-16"
          >
            <div className="inline-block glass rounded-2xl px-8 py-6">
              <p className="text-4xl mb-3">😕</p>
              <p className="text-red-400 font-medium">{error}</p>
              <p className="text-slate-500 text-sm mt-1">Try a different search term</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trending sections (shown before user searches) ── */}
      {!searched && !loading && !error && (
        <div className="mt-10 space-y-10">
          {trendingLoading ? (
            /* Skeleton rows while trending loads */
            Array.from({ length: 3 }).map((_, si) => (
              <div key={si}>
                <div className="shimmer h-6 w-48 rounded mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonCard key={i} index={i} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            trending.map((section, si) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: si * 0.15 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {section.movies.slice(0, 5).map((movie, i) => (
                    <MovieCard key={movie.imdbID} movie={movie} index={i} />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* ── Search Results ── */}
      {!loading && !error && searched && results.length > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 text-sm mt-8 mb-4"
          >
            Showing{" "}
            <span className="text-slate-300 font-medium">{results.length}</span> of{" "}
            <span className="text-slate-300 font-medium">{totalResults}</span> results
            {query && (
              <>
                {" "}for{" "}
                <span className="text-blue-400 font-medium">"{query}"</span>
              </>
            )}
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie, i) => (
              <MovieCard key={movie.imdbID} movie={movie} index={i} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalResults={totalResults}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}