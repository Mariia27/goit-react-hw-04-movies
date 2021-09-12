import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Container from "./components/Container";
import Loader from "./components/loader";
import Api from "./components/services/FetchAPI";

import "./styles/style.css";

const HeaderBar = lazy(() => import("./components/views/HeaderBar"));
const HomeViews = lazy(() => import("./components/views/HomePage"));
const MoviesViews = lazy(() => import("./components/views/MoviesPage"));

const MovieDetailsPage = lazy(() =>
  import("./components/views/MovieDetailsPage")
);

export default function Movies() {
  const [page, setPage] = useState(1);
  const [listNameMovies, setListNameMovies] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  console.log("HOME", location);

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAPI = () => {
    setLoader(true);

    Api.fetchApiMovies(page)
      .then(setListNameMovies)
      .then(setPage((state) => state + 1))
      .catch((error) => setError(error))
      .finally(() => setLoader(false));
  };
  const nextPageTrends = () => {
    fetchAPI();
  };

  return (
    <Container>
      <Suspense fallback={<Loader />}>
        <HeaderBar />
        {loader && <Loader />}
        {error && <h1>{error.message}</h1>}
        <main className="infoBlock">
          <section className="holder">
            <Switch>
              <Route exact path="/">
                <HomeViews arrayMovies={listNameMovies} location={location} />
                <button type="submite" onClick={nextPageTrends}>
                  Інші тренди
                </button>
              </Route>

              <Route exact path="/movies">
                <MoviesViews />
              </Route>
              <Route path="/movies/:moviesId">
                <MovieDetailsPage />
              </Route>
            </Switch>
          </section>
        </main>
      </Suspense>
    </Container>
  );
}
