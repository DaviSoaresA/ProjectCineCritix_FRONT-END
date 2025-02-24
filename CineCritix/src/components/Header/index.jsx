import React, { useState } from "react";
import * as styles from "../Header/Header.module.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

export default function Header({ onSearch }) {
  const [selected, setSelected] = useState("Filmes");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      onSearch(query);
    }
  };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo CineCritix" className={styles.logo} onClick={() => navigate("/")}/>
      <div className={styles.navigation}>
        {["Filmes", "Series", "Minha Conta"].map((item) => (
          <h2
            key={item}
            className={`${styles.navItem} ${
              selected === item ? styles.active : ""
            }`}
            onClick={() => setSelected(item)}
          >
            {item}
          </h2>
        ))}
      </div>

      {(selected === "Filmes" || selected === "Series") && (
        <div className={styles.position}>
          <input
            type="text"
            placeholder={`Pesquisar por ${selected}...`}
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      )}
    </header>
  );
}
