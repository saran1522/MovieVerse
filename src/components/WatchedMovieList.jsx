export default function WatchedMovieList({
  watchedMovies,
  currentId,
  handleCurrentId,
  removeWatched,
}) {
  const watchedList = watchedMovies.map((movie) => {
    return (
      <div
        className="watched-movie"
        key={movie.imdbID}
        onClick={() => {
          handleCurrentId(movie.imdbID);
        }}
      >
        <img src={movie.Poster} alt="" />
        <div className="movie-title">
          <h3>{movie.Title}</h3>
          <p>⌛ {movie.Runtime}</p>
          <p>⭐ {movie.imdbRating}</p>
        </div>
        <button
          className="remove-btn"
          onClick={(e) => {
            e.stopPropagation(); //This means that the event will not trigger event handlers on any ancestor elements
            removeWatched(movie.imdbID);
          }}
        >
          ❌
        </button>
      </div>
    );
  });

  return <div className="watched-list">{watchedList}</div>;
}
