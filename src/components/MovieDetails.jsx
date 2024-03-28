import { useState, useEffect } from "react";
import StarRating from "./StarRating";

const key = "13864b9a";

export default function MovieDetails({
  currentId,
  addWathched,
  handleCurrentId,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const isAdded = watchedMovies.some((movie) => movie.imdbID === currentId);
  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === currentId
  )?.userRating;

  //destructuring movie object
  const {
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Title: title,
    Writer: writer,
    imdbRating: rating,
    imdbVotes: votes,
  } = movie;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${currentId}`
        );
        if (!res.ok) throw new Error("Something went very wrong");
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [currentId]);

  // closing details window on esc press
  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") handleCurrentId(currentId);
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback); //clean up of event listner
  }, [handleCurrentId, currentId]);

  function onWatched() {
    const newMovie = {
      Title: title,
      Poster: poster,
      Runtime: runtime,
      imdbRating: rating,
      imdbID: movie.imdbID,
      userRating: userRating,
    };
    addWathched(newMovie);
    handleCurrentId(movie.imdbID);
  }

  function handleUserRating(userRate) {
    setUserRating(userRate);
  }

  return (
    <>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="loading">⛔ {error} </p>
      ) : (
        <section className="movie-details-section">
          <button
            className="back-btn"
            onClick={() => {
              handleCurrentId(movie.imdbID);
            }}
          >
            ⬅
          </button>
          <header className="movie-details-header">
            <div className="movie-details-img">
              <img src={poster} alt={`poster of ${title} movie`} />
            </div>
            <div className="movie-details-about">
              <h1>{title}</h1>
              <p>
                {released} : {runtime}
              </p>
              <p>{actors}</p>
              <p>
                ⭐{rating} IMDB rating from {votes} votes
              </p>
            </div>
          </header>
          <section className="movie-details-details">
            <StarRating
              handleUserRating={handleUserRating}
              isAdded={isAdded}
              watchedUserRating={watchedUserRating}
            />
            {userRating > 0 && !isAdded && (
              <button className="addToWatched-btn" onClick={onWatched}>
                + add to watched
              </button>
            )}
            <p className="plot">
              <em>{plot}</em>
            </p>
            <p>Genre: {genre}</p>
            <p>Directed by {director}</p>
            <p>Written by {writer}</p>
          </section>
        </section>
      )}
    </>
  );
}
