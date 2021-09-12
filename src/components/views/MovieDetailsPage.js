import {
  useParams,
  Link,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

import Api from "../services/FetchAPI";
import Loader from "../loader";

const Cast = lazy(() => import("./Cast"));
const Reviews = lazy(() => import("./Reviews"));

export default function MovieCard() {
  const { moviesId } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setLoader(true);
    Api.fetchApiOneMovie(moviesId)
      .then(setMovie)
      .catch((error) => setError(error))
      .finally(() => setLoader(false));
  }, [moviesId]);
  const calckRating = (a) => {
    return Math.round((a * 100) / 10);
  };

  const goBackPage = () => {
    history.push(location?.state?.from ?? "/");
  };
  return (
    <div className="constainerDetalFilm">
      {loader && <Loader />}
      <img
        src={movie && `https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt=""
        width="300"
        height="400"
        className="imagesTitle"
      ></img>
      <div>
        <button type="button" onClick={goBackPage} className="goBackBtn">
          Назад
        </button>

        <h1 className="nameSactionDetalFilm">{movie && movie.title}</h1>
        <p>Середня оцінка: {movie && calckRating(movie.vote_average)}%</p>

        <div>
          <h3>Жанр</h3>
          <ul className="ul-genres">
            {movie &&
              movie.genres.map(({ id, name }) => <li key={id}>{name} </li>)}
          </ul>
        </div>

        <div>
          <h2>Опис</h2>
          <p>{movie && movie.overview}</p>
        </div>

        <div>
          <hr />
          <Link className="linkDetalFilm" to={`/movies/${moviesId}/cast`}>
            Актори
          </Link>{" "}
          <br />
          <Link className="linkDetalFilm" to={`/movies/${moviesId}/reviews`}>
            Огляди (Eng)
          </Link>
          <hr />
          <Suspense fallback={<Loader />}>
            <Route path="/movies/:moviesId/cast">
              {movie && <Cast casts={movie} />}
            </Route>
            <Route path="/movies/:moviesId/reviews">
              <Reviews />
            </Route>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
