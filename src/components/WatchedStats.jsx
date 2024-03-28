export default function WatchedStats({ watchedMovies }) {
  let totalWatchedTime = 0;
  let totalRatings = 0;
  let totalUserRating = 0;
  for (let movie of watchedMovies) {
    totalWatchedTime +=
      movie.Runtime !== "N/A" ? Number(movie.Runtime.split(" ").at(0)) : 0;
    totalRatings += movie.imdbRating ? parseFloat(movie.imdbRating) : 0;
    totalUserRating += parseFloat(movie.userRating);
  }
  totalRatings = parseFloat(
    (totalRatings > 0 ? totalRatings / watchedMovies.length : 0).toFixed(1)
  );
  totalUserRating = (
    totalUserRating > 0 ? totalUserRating / watchedMovies.length : 0
  ).toFixed(1);

  return (
    <div className="watchedBox">
      <p>MOVIES YOU WATCHED</p>
      <div className="watchedStats">
        <p>✅ {watchedMovies.length}</p>
        <p>🕑 {totalWatchedTime} min</p>
        <p>⭐ {totalRatings}</p>
        <p>🌟 {totalUserRating}</p>
      </div>
    </div>
  );
}
