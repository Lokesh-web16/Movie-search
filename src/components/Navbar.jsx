import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoritesContext";

export default function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();

  const links = [
    { path: "/", label: "Search" },
    { path: "/favorites", label: "Favorites" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass sticky top-0 z-50 border-b border-slate-800/50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.span
            className="text-2xl"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            🎬
          </motion.span>
          <span className="text-xl font-bold gradient-text">Movie Search</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className="relative px-4 py-2 text-sm font-medium">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-400 hover:text-white transition-colors"}`}>
                  {link.label}
                  {link.path === "/favorites" && favorites.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-rose-500 text-white rounded-full"
                    >
                      {favorites.length}
                    </motion.span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
