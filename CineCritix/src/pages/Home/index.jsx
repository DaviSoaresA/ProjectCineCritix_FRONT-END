import React, { useEffect, useState } from "react";
import * as styles from "../Home/Home.module.css";
import Header from "../../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../service/api";
import { FaSearch } from "react-icons/fa";
import Pipoca from "../../assets/Pipoca_Cinecritix.png"

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      if (Array.isArray(response.data)) {
        setMovies(response.data);
        console.log(response.data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      alert("Erro ao buscar filmes. Tente novamente.");
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  const carouselMovies = Array.isArray(movies) ? movies.slice(0, 10) : [];
  const remainingMovies = Array.isArray(movies) ? movies.slice(10) : [];

  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.header}>
        <div className={styles.positionSearch}>
          <input
            type="text"
            placeholder="Pesquisar filmes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
          />

          <button className={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
        <div className={styles.navigation}>
          <div className={styles.active}>
            <h2>Filmes</h2>
          </div>
          <h2>Séries</h2>
          <h2 onClick={() => navigate("/minhaConta")}>Minha Conta</h2>
        </div>
      </div>

      {search === "" && (
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
          {carouselMovies.length > 0 ? (
            carouselMovies.map((movie) => (
              <SwiperSlide
                key={movie.id}
                className={styles.swiperSlide}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={movie.Poster || "https://via.placeholder.com/300"}
                  alt={movie.Title}
                  className={styles.poster}
                />
                <h2>{movie.Title}</h2>
              </SwiperSlide>
            ))
          ) : (
            <p className={styles.noResults}>Carregando filmes...</p>
          )}
        </Swiper>
      )}

      <div className={styles.contain}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className={styles.card}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img src={movie.Poster} alt={movie.Title} />
              <div className={styles.title}>
                <h4>{movie.Title}</h4>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <img src={Pipoca} alt="pipoca triste" className={styles.pipoca}/>
            <p className={styles.text}>Nenhum filme encontrado...</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
