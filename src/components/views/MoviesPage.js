import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import Api from "../services/FetchAPI";

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  const [moviesSearch, setMoviesSearch] = useState(null);

  const [error, setError] = useState("");

  const { url } = useRouteMatch();
  const location = useLocation();
  const onSubmite = (e) => {
    e.preventDefault();

    myFetch();
  };

  const myFetch = () => {
    Api.fetchApiSearch(page, valueSearch)
      .then(setMoviesSearch)
      .then(incrementPage())
      .catch((error) => setError(error));
  };

  const onValueSearchInput = (e) => {
    const { value } = e.currentTarget;
    setValueSearch(value);
  };

  const incrementPage = () => {
    setPage((state) => state + 1);
  };
  const nextPage = () => {
    myFetch();
  };

  return (
    <div>
      <form onSubmit={onSubmite}>
        <label htmlFor="1"> Введіть назву </label>
        <input
          id="1"
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          value={valueSearch}
          onChange={onValueSearchInput}
        ></input>
        <button type="submit">Пошук</button>
      </form>
      {moviesSearch && (
        <div>
          <ul>
            {moviesSearch.results.map(({ original_title, id }) => (
              <li key={id}>
                {moviesSearch && (
                  <NavLink
                    to={{
                      pathname: `${url}/${id}`,
                      state: { from: location },
                    }}
                  >
                    {original_title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <button onClick={nextPage}>Наступна сторінка</button>
        </div>
      )}
    </div>
  );
}
