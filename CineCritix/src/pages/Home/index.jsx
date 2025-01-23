import { useEffect, useState } from "react";
import axios from "axios";
import * as styles from "../Home/Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  async function getMovies() {
    try {
      const response = await axios.get(
        `http://localhost:8080/`
      );

      if (response.data.Response === "True") {
        setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <div className={styles.container}>
      <div>
        <h1>Movies</h1>
        <p>Welcome to CineCritix!</p>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className={styles.movieCard}>
              <h2>{movie.Title}</h2>
              <img
                src={movie.Poster}
                onError={(e) => (e.target.src = "/placeholder.png")}
                alt={`Cover of the movie ${movie.Title}`}
                style={{ width: "200px", height: "auto", marginBottom: "10px" }}
              />
              <p>
                <strong>Year:</strong> {movie.Year}
              </p>
              <p>
                <strong>Type:</strong> {movie.Type}
              </p>
            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Load More
        </button>
      </div>
    </div>
  );
}
