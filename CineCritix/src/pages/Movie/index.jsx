import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star, StarHalf } from "lucide-react";
import styles from "../Movie/Movie.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const API_KEY = "a1597f569dafd7069822328e2bd0d446";
const API_KEY2 = "2fcfe92f";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [backdrop, setBackdrop] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [cast, setCast] = useState([]);

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

          const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieData.id}/credits`,
            { params: { api_key: API_KEY } }
          );

          setCast(castResponse.data.cast.slice(0, 10));
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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} color="#FFD700" fill="#FFD700" size={32} />);
    }

    if (hasHalfStar) {
      stars.push(
        <div
          key="half"
          style={{ position: "relative", display: "inline-block", width: "32px" }}
        >
          <Star color="#ccc" fill="#ccc" size={32} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              overflow: "hidden",
            }}
          >
            <Star color="#FFD700" fill="#FFD700" size={32} />
          </div>
        </div>
      );
    }

    while (stars.length < 5) {
      stars.push(<Star key={stars.length} color="#ccc" fill="#ccc" size={32} />);
    }

    return stars;
  };
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
                    <h2>Gênero: {movie.Genre}</h2>
                    <h2>Duração: {movie.Runtime}</h2>
                    <h3>Data do lançamento: {movie.Released}</h3>
                    <h2>Sinopse: </h2>
                    <p className={styles.space}>{movie.Plot}</p>
                    <hr />
                    <h2 className={styles.space}>Diretor: {movie.Director}</h2>
                    <hr />
                    <h2 className={styles.space}>Roterista: {movie.Writer}</h2>
                    <hr />
                  </div>
                  <div className={styles.positionStar}>
                    <div className={styles.stars}>
                      {renderStars(movie.imdbRating)}
                    </div>
                    <h1>Nota: {movie.imdbRating}</h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      <div className={styles.contain}>
        <h1>Elenco:</h1>
        <div className={styles.castContainer}>
          {cast.map((actor) => (
            <div key={actor.id} className={styles.actor}>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  actor.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={actor.name}
                  className={styles.actorImage}
                />
                <p className={styles.actorName}>{actor.name}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
