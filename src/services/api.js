const API_KEY = "4a0ec4e4478685ac6de60479e0a1ddf7";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

export const discoverMovies = async ({
  genre,
  rating,
  year,
  language,
  sortBy,
} = {}) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    include_adult: false,
  });
  if (sortBy) params.set("sort_by", sortBy);
  if (genre) params.set("with_genres", genre);
  if (rating) params.set("vote_average.gte", rating);
  if (year) {
    params.set("primary_release_date.gte", `${year}-01-01`);
    params.set("primary_release_date.lte", `${year}-12-31`);
  }
  if (language) params.set("with_original_language", language);
  const response = await fetch(`${BASE_URL}/discover/movie?${params}`);
  const data = await response.json();
  return data.results;
};

export const getMovieTrailer = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
  );
  const data = await response.json();
  const trailer = data.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer",
  );
  return trailer ? trailer.key : null;
};
