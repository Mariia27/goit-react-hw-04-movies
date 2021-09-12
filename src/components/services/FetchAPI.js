function fetchApiMovies(page) {
  const KEY = "e7e2507b2fa46a984d747d817ebe413d";
  const GENERAL_LINK_TRENDS = "https://api.themoviedb.org/3/trending/all/day";
  return fetch(
    `${GENERAL_LINK_TRENDS}?api_key=${KEY}&language=ru&page=${page}`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error("Такого запиту не існує"));
  });
}

function fetchApiSearch(page, query) {
  const KEY = "e7e2507b2fa46a984d747d817ebe413d";
  const GENERAL_LINK_TRENDS = "https://api.themoviedb.org/3";
  return fetch(
    `${GENERAL_LINK_TRENDS}/search/movie?api_key=${KEY}&query=${query}&language=ru&page=${page}&include_adult=false`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error("Такого запиту не існує"));
  });
}

function fetchApiOneMovie(idMovie) {
  const KEY = "e7e2507b2fa46a984d747d817ebe413d";
  const GENERAL_LINK_ONE_MOVIE = "https://api.themoviedb.org/3/movie/";

  return fetch(
    `${GENERAL_LINK_ONE_MOVIE}${idMovie}?api_key=${KEY}&language=ru`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error("Такий фільм не існує"));
  });
}

function fetchApiReviews(idMovie) {
  const KEY = "e7e2507b2fa46a984d747d817ebe413d";
  const GENERAL_LINK_ONE_MOVIE = "https://api.themoviedb.org/3/movie/";

  return fetch(
    `${GENERAL_LINK_ONE_MOVIE}${idMovie}/reviews?api_key=${KEY}`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error("Такої сторінки з кастами не існує"));
  });
}

function fetchApiCasts(idMovie) {
  const KEY = "e7e2507b2fa46a984d747d817ebe413d";
  const GENERAL_LINK_ONE_MOVIE = "https://api.themoviedb.org/3/movie/";

  return fetch(
    `${GENERAL_LINK_ONE_MOVIE}${idMovie}/credits?api_key=${KEY}&language=ru&page=1`
  ).then((r) => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(new Error("Такої сторінки з кастами не існує"));
  });
}

const api = {
  fetchApiMovies,
  fetchApiSearch,
  fetchApiOneMovie,
  fetchApiReviews,
  fetchApiCasts,
};
export default api;
