export const fetcher = (...args) =>
  fetch(...args).then((res) => res.json());
export const apiKey = "c3e6cdeb8de2b808dbe2f2966b733d24";
export const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
  getMovieDetails: (movieId) =>
    `${tmdbEndpoint}/${movieId}?api_key=${apiKey}&language=en-US`,
  getMovieInfo: (movieId, type = "") =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}&language=en-US`,
  getImage: (path, type = "original") =>
    `https://image.tmdb.org/t/p/${type}/${path}`,
};
