import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function MovieCard({ movie, index = 0 }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(movie.imdbID);

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
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="poster-placeholder h-80">No Poster</div>
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
