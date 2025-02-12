import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../Movie/Movie.module.css";
import Header from "../../components/Header";

const API_KEY = "a1597f569dafd7069822328e2bd0d446";
const API_KEY2 = "2fcfe92f";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [backdrop, setBackdrop] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const getMovieById = async (imdbID) => {
      try {
        const omdbResponse = await axios.get(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY2}`
        );

        if (!omdbResponse.data || omdbResponse.data.Response === "False") {
          console.error("Filme não encontrado na OMDb.");
          return;
        }

        const tmdbResponse = await axios.get(
          `https://api.themoviedb.org/3/find/${imdbID}`,
          { params: { api_key: API_KEY, external_source: "imdb_id" } }
        );

        if (
          tmdbResponse.data.movie_results &&
          tmdbResponse.data.movie_results.length > 0
        ) {
          const movieData = tmdbResponse.data.movie_results[0];

          if (movieData.backdrop_path) {
            setBackdrop(
              `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`
            );
          }

          const trailerResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieData.id}/videos`,
            { params: { api_key: API_KEY } }
          );

          if (trailerResponse.data.results.length > 0) {
            const trailer = trailerResponse.data.results.find(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            );
            if (trailer) {
              setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
            }
          }
        }

        setMovie(omdbResponse.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    if (id) {
      getMovieById(id);
    }
  }, [id]);

  return (
    <main>
      <Header />
      {backdrop ? (
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${backdrop})` }}
        >
          {movie && (
            <div className={styles.box}>
              <div className={styles.movie}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className={styles.poster}
                />
                {trailerUrl && (
                  <a
                    href={trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.trailer}
                  >
                    <button>Assistir Trailer</button>
                  </a>
                )}
              </div>

              <div className={styles.info}>
                <div className={styles.line}>
                  <div className={styles.position}>
                    <h1>{movie.Title}</h1>
                  </div>
                  <div className={styles.positionStar}>
                    <h1>{movie.imdbRating}</h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </main>
  );
}
