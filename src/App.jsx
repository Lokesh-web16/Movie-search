import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import Footer from "./components/Footer";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        {/* Animated gradient background */}
        <div className="bg-animated" />

        <Navbar />
        <main className="min-h-screen pb-12">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/movie/:id" element={<MovieDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}
