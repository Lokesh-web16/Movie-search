const API_KEY = "b9bd48a6"; // OMDB free tier key
const BASE_URL = "https://www.omdbapi.com/";

/**
 * Search movies by title with optional type filter and pagination.
 * @param {string} query - Search term
 * @param {number} page - Page number (1-based)
 * @param {string} type - Filter type: "", "movie", "series", "episode"
 * @returns {Promise<{Search: Array, totalResults: string, Response: string}>}
 */
export async function searchMovies(query, page = 1, type = "") {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: query,
    page: String(page),
  });
  if (type) {
    params.set("type", type);
  }

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) {
    throw new Error(`Network error: ${res.status}`);
  }
  const data = await res.json();
  if (data.Response === "False") {
    // OMDB always returns "Movie not found!" — make it type-aware
    const typeLabels = { movie: "Movie", series: "Series", episode: "TV Episode" };
    const label = typeLabels[type] || "Result";
    const apiError = data.Error || "";
    if (apiError.toLowerCase().includes("not found")) {
      const hint = type === "episode"
        ? " Try a more specific episode title."
        : "";
      throw new Error(`${label} not found!${hint}`);
    }
    if (apiError.toLowerCase().includes("too many results")) {
      throw new Error("Too many results. Please refine your search.");
    }
    throw new Error(apiError || "No results found.");
  }
  return data;
}

/**
 * Fetch full details for a single movie by IMDB ID.
 * @param {string} imdbID
 * @returns {Promise<Object>}
 */
export async function getMovieDetails(imdbID) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbID,
    plot: "full",
  });

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) {
    throw new Error(`Network error: ${res.status}`);
  }
  const data = await res.json();
  if (data.Response === "False") {
    const label = data.Type === "series" ? "Series" : data.Type === "episode" ? "Episode" : "Movie";
    const apiError = data.Error || "";
    if (apiError.toLowerCase().includes("not found")) {
      throw new Error(`${label} not found!`);
    }
    throw new Error(apiError || "Details not available.");
  }
  return data;
}
