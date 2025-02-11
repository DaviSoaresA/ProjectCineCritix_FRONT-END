import React, { useEffect, useState } from "react";
import * as styles from "../Home/Home.module.css";
import Header from "../../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const API_KEY = "2fcfe92f";

// import { EffectCoverflow, Pagination, Navigation } from "swiper";

// http://www.omdbapi.com/2fcfe92f

export default function Home() {
  const [movie, setMovie] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const getMovie = async (query) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );

      if (response.data.Search) {
        setMovie(response.data.Search);
      } else {
        setMovie([]);
      }
    } catch (error) {
      alert("Erro ao buscar filmes. Tente novamente.");
    }
  };

  const getMovies = async (query) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=movie&page=1&apikey=${API_KEY}`
      );

      if (response.data.Search) {
        setMovies(response.data.Search);
        console.log(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      alert("Erro ao buscar filmes. Tente novamente.");
    }
  };

  useEffect(() => {
    getMovie("sonic");
    getMovies();
  }, []);

  return (
    <main className={styles.container}>
      <Header
        box="filmes"
        ColorMovie={{ color: "#3152B7" }}
        onSearch={"movies"}
      />
      <Swiper
        effect="coverflow"
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={-50}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className={styles.swiperContainer}
      >
        {movie.length > 0 ? (
          movie.map((movie, index) => (
            <SwiperSlide key={index} className={styles.swiperSlide}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300"
                }
                alt={movie.Title}
                className={styles.poster}
              />
              <h2>
                {movie.Title}
              </h2>
            </SwiperSlide>
          ))
        ) : (
          <p className={styles.noResults}>Nenhum filme encontrado.</p>
        )}
      </Swiper>
      <div className={styles.contain}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className={styles.card} onClick={() => navigate(`/movie/${movie.imdbID}`)}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className={styles.title}>
                <h4>{movie.Title}</h4>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando filmes...</p>
        )}
      </div>
      <Footer />
    </main>
  );
}
