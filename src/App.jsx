import { useState } from "react";
import Nav from "./components/Nav";
import Box from "./components/Box";
import WatchedStats from "./components/WatchedStats";
import "./App.css";
import SearchList from "./components/SearchList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieList from "./components/WatchedMovieList";
import { useMovie } from "./components/useMovie";
import { useLocalStorage } from "./components/useLocalStorage";

function App() {
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [watchedMovies, setWatchedMovies] = useLocalStorage(
    [],
    "watchedMovies"
  );
  const { movies, loading, error } = useMovie(search);

  function handleCurrentId(id) {
    setCurrentId(id === currentId ? null : id);
  }

  function addWathched(movieToAdd) {
    setWatchedMovies((prevWatched) => [...prevWatched, movieToAdd]);
  }

  function removeWatched(movieId) {
    setWatchedMovies((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== movieId)
    );
  }

  return (
    <div className="home">
      <Nav movies={movies} search={search} setSearch={setSearch} />
      <main className="moviesBox">
        <Box>
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error"> ⛔ {error} ⛔</p>}
          {!loading && !error && (
            <SearchList movies={movies} handleCurrentId={handleCurrentId} />
          )}
        </Box>
        <Box>
          {currentId ? (
            <MovieDetails
              currentId={currentId}
              addWathched={addWathched}
              handleCurrentId={handleCurrentId}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <WatchedStats watchedMovies={watchedMovies} />
              <WatchedMovieList
                watchedMovies={watchedMovies}
                handleCurrentId={handleCurrentId}
                currentId={currentId}
                removeWatched={removeWatched}
              />
            </>
          )}
        </Box>
      </main>
    </div>
  );
}

export default App;
