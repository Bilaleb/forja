function Filter({ title, onTitleChange, minRating, onMinRatingChange }) {
  return (
    <div className="filter-bar" role="search" aria-label="Filter movies">
      <label className="search-field" htmlFor="filter-title">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="search-icon"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          id="filter-title"
          type="search"
          placeholder="Find a movie..."
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
      </label>

      <label className="rating-filter" htmlFor="filter-rating">
        <span className="rating-star" aria-hidden="true">★</span>
        <span className="filter-label">Rating</span>
        <select
          id="filter-rating"
          value={minRating}
          onChange={(event) => onMinRatingChange(event.target.value)}
        >
          <option value="">Any</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
          <option value="9">9+</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;
