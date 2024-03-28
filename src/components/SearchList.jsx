export default function SearchList({ movies, handleCurrentId }) {
  const allMovies = movies.map((movie) => {
    return (
      <div
        key={movie.imdbID}
        className="search-movie"
        onClick={() => {
          handleCurrentId(movie.imdbID);
        }}
      >
        <div className="search-movie-details">
          <img src={movie.Poster} alt={`poster of ${movie.Title} movie`} />
          <div className="movie-title">
            <h3>{movie.Title}</h3>
            <p>📅 {movie.Year}</p>
          </div>
        </div>
      </div>
    );
  });

  return <div className="search-movie-list">{allMovies}</div>;
}
