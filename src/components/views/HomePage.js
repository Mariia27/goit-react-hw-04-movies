import { Link, useLocation } from "react-router-dom";

export default function Home({ arrayMovies }) {
  const location = useLocation();
  const { results } = arrayMovies;

  return (
    <div className="constainerHome">
      <h1 className="homePage">Фільми в тренді</h1>
      <ul className="g-ul containerTrends">
        {results &&
          results.map(({ title, name, id }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
                className="g-a linkFilms"
              >
                <span className="titleTextListTrends">{title ?? name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
