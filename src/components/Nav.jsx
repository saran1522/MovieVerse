import { useEffect, useRef } from "react";

export default function Nav({ movies, search, setSearch }) {
  const inputEl = useRef(null);
  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        setSearch("");
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [setSearch]);

  return (
    <nav>
      <div className="logo">
        <img
          src="https://img.icons8.com/?size=512&id=SPIi4dtQGDLy&format=png"
          alt=""
        />
        <p className="logoText">MovieMasala</p>
      </div>
      <div className="search">
        <input
          type="search"
          name=""
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputEl}
        />
      </div>
      <div className="results">found {movies.length} results</div>
    </nav>
  );
}
