import React from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === movieId);

  return (
    <main className="app-shell details-shell">
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span> Back to home
      </Link>

      {movie ? (
        <article className="movie-details">
          <div className="details-heading">
            <div>
              <p className="eyebrow">NOW SHOWING</p>
              <h1>{movie.title}</h1>
              <p className="details-rating">
                <span aria-hidden="true">★</span> {Number(movie.rating).toFixed(1)} / 10
              </p>
            </div>
            <img className="details-poster" src={movie.posterURL} alt={`${movie.title} poster`} />
          </div>

          <section className="details-section" aria-labelledby="movie-description-heading">
            <h2 id="movie-description-heading">About this pick</h2>
            <p>{movie.description}</p>
          </section>

          <section className="details-section" aria-labelledby="movie-trailer-heading">
            <h2 id="movie-trailer-heading">Watch the trailer</h2>
            {movie.trailerURL ? (
              <div className="trailer-frame">
                <iframe
                  src={movie.trailerURL}
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <p className="trailer-unavailable">No trailer has been added for this movie yet.</p>
            )}
          </section>
        </article>
      ) : (
        <section className="details-not-found">
          <h1>Movie not found</h1>
          <p>It may have been removed from your collection.</p>
        </section>
      )}
    </main>
  );
}

export default MovieDetails;
