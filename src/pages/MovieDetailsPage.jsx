import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMovieDetails } from "../services/omdbApi";
import { useFavorites } from "../context/FavoritesContext";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    getMovieDetails(id)
      .then((data) => { if (!cancelled) setMovie(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <DetailsSkeleton />;

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mt-20"
      >
        <div className="inline-block glass rounded-2xl px-8 py-6">
          <p className="text-4xl mb-3">😕</p>
          <p className="text-red-400 font-medium">{error}</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm mt-3 inline-block">
            ← Back to search
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!movie) return null;

  const fav = isFavorite(movie.imdbID);
  const toggleFav = () => {
    fav
      ? removeFavorite(movie.imdbID)
      : addFavorite({
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
          Type: movie.Type,
        });
  };

  const hasPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="relative">
      {/* Background blur poster */}
      {hasPoster && (
        <div className="absolute inset-0 h-[500px] overflow-hidden">
          <img
            src={movie.Poster}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050b18]/80 to-[#050b18]" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-8 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to search
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-30 blur group-hover:opacity-50 transition-opacity" />
              {hasPoster ? (
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  className="relative w-72 rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="relative poster-placeholder w-72 h-96 rounded-2xl">
                  No Poster
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold text-white leading-tight">
                {movie.Title}
              </h1>
              <motion.button
                onClick={toggleFav}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                className="text-3xl flex-shrink-0"
              >
                <motion.span
                  key={fav ? "f" : "e"}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  {fav ? "❤️" : "🤍"}
                </motion.span>
              </motion.button>
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.Year && <Badge>{movie.Year}</Badge>}
              {movie.Rated && movie.Rated !== "N/A" && <Badge>{movie.Rated}</Badge>}
              {movie.Runtime && movie.Runtime !== "N/A" && <Badge>⏱ {movie.Runtime}</Badge>}
              {movie.Type && (
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                  {movie.Type}
                </span>
              )}
            </div>

            {/* Genre pills */}
            {movie.Genre && movie.Genre !== "N/A" && (
              <div className="flex flex-wrap gap-2 mt-3">
                {movie.Genre.split(", ").map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1 text-xs text-blue-300 border border-blue-500/30 rounded-full bg-blue-500/10"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Plot */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <SectionTitle>Plot</SectionTitle>
                <p className="text-slate-400 text-sm leading-relaxed">{movie.Plot}</p>
              </motion.div>
            )}

            {/* Cast & Crew */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {movie.Director && movie.Director !== "N/A" && (
                <InfoBlock label="Director" value={movie.Director} />
              )}
              {movie.Writer && movie.Writer !== "N/A" && (
                <InfoBlock label="Writer" value={movie.Writer} />
              )}
            </div>

            {movie.Actors && movie.Actors !== "N/A" && (
              <div className="mt-4">
                <SectionTitle>Cast</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {movie.Actors.split(", ").map((actor) => (
                    <span
                      key={actor}
                      className="px-3 py-1.5 glass-light rounded-lg text-xs text-slate-300"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ratings */}
            {movie.Ratings && movie.Ratings.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <SectionTitle>Ratings</SectionTitle>
                <div className="flex flex-wrap gap-3">
                  {movie.Ratings.map((r) => (
                    <div
                      key={r.Source}
                      className="glass-light rounded-xl px-4 py-3 min-w-[120px]"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                        {r.Source}
                      </p>
                      <p className="text-lg font-bold gradient-text">{r.Value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Extra info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              {movie.Language && movie.Language !== "N/A" && (
                <MiniInfo label="Language" value={movie.Language} />
              )}
              {movie.Country && movie.Country !== "N/A" && (
                <MiniInfo label="Country" value={movie.Country} />
              )}
              {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                <MiniInfo label="Box Office" value={movie.BoxOffice} />
              )}
              {movie.Awards && movie.Awards !== "N/A" && (
                <MiniInfo label="Awards" value={movie.Awards} />
              )}
              {movie.Released && movie.Released !== "N/A" && (
                <MiniInfo label="Released" value={movie.Released} />
              )}
              {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                <MiniInfo label="IMDB Votes" value={movie.imdbVotes} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Badge({ children }) {
  return (
    <span className="px-3 py-1 glass-light rounded-full text-xs text-slate-300 font-medium">
      {children}
    </span>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
      {children}
    </h2>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="glass-light rounded-xl px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm text-slate-300">{value}</p>
    </div>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div className="glass-light rounded-lg px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-xs text-slate-300 mt-0.5">{value}</p>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="shimmer h-4 w-24 rounded mb-8" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="shimmer w-72 h-96 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-4">
          <div className="shimmer h-8 w-3/4 rounded" />
          <div className="flex gap-2">
            <div className="shimmer h-6 w-16 rounded-full" />
            <div className="shimmer h-6 w-16 rounded-full" />
            <div className="shimmer h-6 w-20 rounded-full" />
          </div>
          <div className="shimmer h-4 w-full rounded" />
          <div className="shimmer h-4 w-full rounded" />
          <div className="shimmer h-4 w-2/3 rounded" />
          <div className="shimmer h-20 w-full rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
}