import { useMemo, useState } from "react";
import Filter from "./components/Filter.jsx";
import MovieList from "./components/MovieList.jsx";

const initialMovies = [
  {
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    rating: 8.5,
  },
  {
    title: "Everything Everywhere All at Once",
    description:
      "An exhausted laundromat owner is swept into an adventure across the multiverse, where only she can save existence.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    rating: 7.8,
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    description:
      "Teenager Miles Morales becomes Spider-Man and joins heroes from other dimensions to save the multiverse.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xjvum4G.jpg",
    rating: 8.4,
  },
].map((movie, index) => ({ ...movie, id: `seed-${index + 1}` }));

const emptyMovie = {
  title: "",
  description: "",
  posterURL: "",
  rating: "",
};

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [titleFilter, setTitleFilter] = useState("");
  const [minRating, setMinRating] = useState("");
  const [newMovie, setNewMovie] = useState(emptyMovie);

  const filteredMovies = useMemo(() => {
    const normalizedTitle = titleFilter.trim().toLowerCase();
    const minimum = minRating === "" ? null : Number(minRating);

    return movies.filter((movie) => {
      const matchesTitle = movie.title.toLowerCase().includes(normalizedTitle);
      const matchesRating = minimum === null || movie.rating >= minimum;
      return matchesTitle && matchesRating;
    });
  }, [movies, titleFilter, minRating]);

  function handleMovieChange(event) {
    const { name, value } = event.target;
    setNewMovie((currentMovie) => ({ ...currentMovie, [name]: value }));
  }

  function handleAddMovie(event) {
    event.preventDefault();
    setMovies((currentMovies) => [
      {
        ...newMovie,
        id: crypto.randomUUID(),
        title: newMovie.title.trim(),
        rating: Number(newMovie.rating),
      },
      ...currentMovies,
    ]);
    setNewMovie(emptyMovie);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">YOUR PERSONAL WATCHLIST</p>
          <h1>Reel Picks<span>.</span></h1>
          <p className="hero-description">
            A little home for the stories you love.
          </p>
        </div>
        <div className="collection-count" aria-live="polite">
          <span className="count-number">{movies.length}</span>
          <span className="count-label">
            {movies.length === 1 ? "movie saved" : "movies saved"}
          </span>
        </div>
      </header>

      <section className="content-grid" aria-label="Movie collection">
        <aside className="sidebar">
          <form className="add-form panel" onSubmit={handleAddMovie}>
            <div className="section-heading">
              <span className="section-icon" aria-hidden="true">+</span>
              <div>
                <h2>Add a pick</h2>
                <p>Save a movie or show you love.</p>
              </div>
            </div>

            <label htmlFor="movie-title">Title</label>
            <input
              id="movie-title"
              name="title"
              type="text"
              placeholder="e.g. The Grand Budapest Hotel"
              value={newMovie.title}
              onChange={handleMovieChange}
              required
              maxLength={100}
            />

            <label htmlFor="movie-description">Description</label>
            <textarea
              id="movie-description"
              name="description"
              placeholder="What is it about?"
              value={newMovie.description}
              onChange={handleMovieChange}
              required
              rows={3}
              maxLength={500}
            />

            <label htmlFor="movie-poster">Poster image URL</label>
            <input
              id="movie-poster"
              name="posterURL"
              type="url"
              placeholder="https://example.com/poster.jpg"
              value={newMovie.posterURL}
              onChange={handleMovieChange}
              required
            />

            <label htmlFor="movie-rating">Rating <span className="label-hint">out of 10</span></label>
            <input
              id="movie-rating"
              name="rating"
              type="number"
              placeholder="8.5"
              min="0"
              max="10"
              step="0.1"
              value={newMovie.rating}
              onChange={handleMovieChange}
              required
            />

            <button className="primary-button" type="submit">
              Add to collection <span aria-hidden="true">↗</span>
            </button>
          </form>

          <div className="sidebar-note">
            <span className="note-star" aria-hidden="true">✳</span>
            <p>Good stories are even better when they’re remembered.</p>
          </div>
        </aside>

        <div className="collection">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">THE GOOD STUFF</p>
              <h2>Your collection</h2>
            </div>
            <span className="result-count">
              {filteredMovies.length} {filteredMovies.length === 1 ? "title" : "titles"}
            </span>
          </div>

          <Filter
            title={titleFilter}
            onTitleChange={setTitleFilter}
            minRating={minRating}
            onMinRatingChange={setMinRating}
          />

          <MovieList movies={filteredMovies} />
        </div>
      </section>

      <footer className="footer">
        <span>REEL PICKS</span>
        <span>Made for movie lovers.</span>
      </footer>
    </main>
  );
}

export default App;
