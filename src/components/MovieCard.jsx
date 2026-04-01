import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

/** Generates a consistent gradient based on the movie title */
function titleToGradient(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 50%, 20%) 0%, hsl(${h2}, 60%, 12%) 100%)`;
}

export default function MovieCard({ movie, index = 0 }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);
  const [imgFailed, setImgFailed] = useState(false);

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fav ? removeFavorite(movie.imdbID) : addFavorite(movie);
  };

  const typeColors = {
    movie: "from-blue-500 to-cyan-500",
    series: "from-purple-500 to-pink-500",
    episode: "from-amber-500 to-orange-500",
  };

  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imgFailed;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link
        to={`/movie/${movie.imdbID}`}
        className="group relative block glass rounded-xl overflow-hidden"
      >
        {/* Hover glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />

        <div className="relative">
          {/* Poster */}
          <div className="relative overflow-hidden">
            {hasPoster ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div
                className="h-80 flex flex-col items-center justify-center gap-3 px-4"
                style={{ background: titleToGradient(movie.Title) }}
              >
                <span className="text-4xl opacity-60">🎬</span>
                <p className="text-white text-sm font-semibold text-center leading-tight opacity-80">
                  {movie.Title}
                </p>
                <p className="text-slate-400 text-xs">{movie.Year}</p>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

            {/* Type badge */}
            <span
              className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-full bg-gradient-to-r ${typeColors[movie.Type] || "from-slate-500 to-slate-600"}`}
            >
              {movie.Type}
            </span>

            {/* Favorite button */}
            <motion.button
              onClick={toggleFav}
              whileTap={{ scale: 0.7 }}
              aria-label={fav ? "Remove from favorites" : "Add to favorites"}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-lg transition-colors hover:bg-black/60"
            >
              <motion.span
                key={fav ? "filled" : "empty"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {fav ? "❤️" : "🤍"}
              </motion.span>
            </motion.button>
          </div>

          {/* Info */}
          <div className="p-3">
            <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
              {movie.Title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">{movie.Year}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}