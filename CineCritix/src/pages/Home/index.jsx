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
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import Pipoca from "../../assets/Pipoca_Cinecritix.png";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const itemsPerPage = 20;

  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      if (Array.isArray(response.data)) {
        setMovies(response.data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      alert("Erro ao buscar filmes. Tente novamente.");
      setMovies([]);
    }
    console.log("Filmes carregados:", movies);

  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  );

  const carouselMovies = Array.isArray(movies) ? movies.slice(0, 10) : [];

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = filteredMovies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          {isAuthenticated ? (
            <h2 onClick={() => navigate("/minhaConta")}>Minha Conta</h2>
          ) : (
            <h2 onClick={() => navigate("/login")}>Login</h2>
          )}
        </div>
      </div>

      {search === "" && currentPage === 1 && (
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
          {carouselMovies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className={styles.swiperSlide}
              onClick={() => {
                console.log("ID do filme clicado:", movie.id);
                navigate(`/movie/${movie.id}`);
              }}
              
            >
              <img
                src={movie.Poster || "https://via.placeholder.com/300"}
                alt={movie.Title}
                className={styles.poster}
              />
              <h2>{movie.Title}</h2>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className={styles.contain}>
        {paginatedMovies.length > 0 ? (
          paginatedMovies.map((movie) => (
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
            <img src={Pipoca} alt="pipoca triste" className={styles.pipoca} />
            <p className={styles.text}>Nenhum filme encontrado...</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton2}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              className={`${styles.pageButton} ${
                number === currentPage ? styles.active : ""
              }`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton2}
          >
            {">"}
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
