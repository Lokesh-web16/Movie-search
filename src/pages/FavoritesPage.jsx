import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        <span className="gradient-text">Your Favorites</span>
      </motion.h1>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-20"
        >
          <p className="text-6xl mb-4">💔</p>
          <p className="text-slate-500 text-lg">No favorites yet</p>
          <p className="text-slate-600 text-sm mt-1">
            Search for movies and click the heart to save them here
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((movie, i) => (
              <MovieCard key={movie.imdbID} movie={movie} index={i} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
