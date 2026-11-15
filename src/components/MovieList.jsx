import React from "react";
import MovieCard from "./MovieCard.jsx";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">⌕</span>
        <h3>No movies found</h3>
        <p>Try a different title or rating filter.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
