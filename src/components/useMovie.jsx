import { useState, useEffect } from "react";

const key = "13864b9a";
export function useMovie(search) {
  const [movies, setMoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${search}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        console.log(data.Error);

        setMoveis(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    if (search.length < 3) {
      setMoveis([]);
      setError("");
      return;
    }
    fetchMovies();

    //cleaning up fetch on unmount or before next fetch
    return () => controller.abort();
  }, [search]);

  return { movies, loading, error };
}
