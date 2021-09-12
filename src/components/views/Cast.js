import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Api from "../services/FetchAPI";

export default function Cast() {
  const { moviesId } = useParams();
  const [casts, setCasts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Api.fetchApiCasts(moviesId)
      .then((actor) => setCasts(actor.cast))
      .catch((error) => setError(error));
  }, [moviesId]);

  return (
    <ul>
      {casts &&
        casts.map(({ original_name, character, id, profile_path }) => (
          <li key={id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt=""
            />
            <p>{original_name}</p>
            <p>{character}</p>
          </li>
        ))}
    </ul>
  );
}
