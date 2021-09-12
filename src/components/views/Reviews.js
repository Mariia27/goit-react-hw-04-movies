import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Api from "../services/FetchAPI";

export default function Reviews() {
  const { moviesId } = useParams();

  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Api.fetchApiReviews(moviesId)
      .then(setReviews)
      .catch((error) => setError(error));
  }, [moviesId]);

  return reviews && reviews.results.length > 0 ? (
    <ul>
      {reviews.results.map(({ author, id, content }) => (
        <li key={id}>
          <p>Автор: {author}</p> <p>{content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p> Обзори по даному запиту відсутні</p>
  );
}
