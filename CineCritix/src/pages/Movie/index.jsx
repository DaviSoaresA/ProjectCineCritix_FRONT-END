import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Star, StarHalf } from "lucide-react";
import styles from "../Movie/Movie.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";
import { div, p } from "framer-motion/client";

const API_KEY = "a1597f569dafd7069822328e2bd0d446";
const API_KEY2 = "2fcfe92f";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [backdrop, setBackdrop] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [cast, setCast] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [charCount, setcharCount] = useState(0);
  const navigate = useNavigate();
  const charLimit = 500;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length <= charLimit) {
      setcharCount(text.length);
    }
  };

  useEffect(() => {
    setValue("rating", userRating);
  }, [userRating, setValue]);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await axios.get(
          "https://6750549b69dc1669ec1aa14e.mockapi.io/comentario"
        );
        setComentarios(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
      }
    };

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

    fetchComentarios();

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
          style={{
            position: "relative",
            display: "inline-block",
            width: "32px",
          }}
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
      stars.push(
        <Star key={stars.length} color="#ccc" fill="#ccc" size={32} />
      );
    }

    return stars;
  };

  const handleRating = (value) => {
    setUserRating(value);
  };

  const renderInteractiveStars = () => {
    return Array.from({ length: 10 }, (_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={starValue}
          size={32}
          color={starValue <= (hoverRating || userRating) ? "#FFD700" : "#ccc"}
          fill={starValue <= (hoverRating || userRating) ? "#FFD700" : "none"}
          onClick={() => setUserRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
          style={{ cursor: "pointer", margin: "0 3px" }}
        />
      );
    });
    return <>{stars}</>;
  };

  const onSubmit = async (data) => {
    const newComentario = {
      nome: data.nome,
      nota: data.rating,
      comentario: data.review,
      foto: "https://imgs.search.brave.com/IgDJf1N6t1_bgUra7DI8aW1nxPQhyvzJjjLpjNYXs7M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/YmFuZC51b2wuY29t/LmJyL2ltYWdlLzIw/MjUvMDIvMDUvZ2Vy/bWFuLWNhbm8tY29t/ZW1vcmEtZ29sLWNv/bnRyYS1vLXZhc2Nv/LTIzNTlfODAweDQ1/MC53ZWJw",
    }
    
    try {
      const response = await axios.post("https://6750549b69dc1669ec1aa14e.mockapi.io/comentario", newComentario);
      setComentarios([...comentarios, response.data]);
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
    alert("Avaliação enviada com sucesso!");
  };

  return (
    <main>
      <Header />
      <div className={styles.header}>
        <div className={styles.navigation}>
          <div className={styles.active}>
            <h2  onClick={() => navigate("/")}>Filmes</h2>
          </div>
          <h2>Séries</h2>
          <h2 onClick={() => navigate("/minhaConta")}>Minha Conta</h2>
        </div>
      </div>
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

        <div className={styles.feedbackArea}>
          <h1 className={styles.titleFeedback}>Avalie este Filme!</h1>
          <div>{renderInteractiveStars()}</div>
          <h2>Sua nota: {userRating}</h2>
          {errors.rating && (
            <p className={styles.error}>A nota é obrigatória!</p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.feedbackArea}
          >
            <input
              type="hidden"
              {...register("rating", { required: "A nota é obrigatória!" })}
              value={userRating}
            />

            {errors.rating && (
              <p className={styles.error}>{errors.rating.message}</p>
            )}

            <textarea
              {...register("review")}
              placeholder="Escreva sua avaliação... (Opcional)"
              className={styles.textarea}
              rows="5"
              maxLength={500}
              onChange={handleChange}
            ></textarea>
            <p>
              {charCount} / {charLimit} caracteres
            </p>
            <button
              className={styles.button}
              type="submit"
              disabled={userRating === 0}
            >
              <h3>Enviar Avaliação</h3>
            </button>
          </form>

          <div className={styles.comentarios}>
            <h1>Avaliações:</h1>
            {comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <div key={comentario.id} className={styles.comentarioCard}>
                  <img
                    src={
                      comentario.foto
                        ? comentario.foto
                        : "https://via.placeholder.com/150"
                    }
                    alt={comentario.nome}
                    className={styles.avataroto}
                  />

                  <div className={styles.comentarioInfo}>
                    <h3 className={styles.name}>{comentario.nome}</h3>
                    <div className={styles.starsAvaliation}>
                      <h3 className={styles.nota}>Nota: {comentario.nota}</h3>
                      <div className={styles.star}>
                        {renderStars(comentario.nota)}
                      </div>
                    </div>
                    <p>{comentario.comentario}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma avaliação feita ainda.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
