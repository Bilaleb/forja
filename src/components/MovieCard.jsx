import { useState } from "react";

function MovieCard({ movie }) {
  const [posterFailed, setPosterFailed] = useState(false);

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {!posterFailed ? (
          <img
            className="movie-poster"
            src={movie.posterURL}
            alt={`${movie.title} poster`}
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        ) : (
          <div className="poster-fallback" aria-label="Poster unavailable">
            <span aria-hidden="true">▶</span>
            <span>{movie.title}</span>
          </div>
        )}
        <div className="rating-badge" aria-label={`Rating ${movie.rating} out of 10`}>
          <span aria-hidden="true">★</span> {Number(movie.rating).toFixed(1)}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
      </div>
    </article>
  );
}

export default MovieCard;
