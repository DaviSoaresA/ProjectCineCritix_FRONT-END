import React, { useState } from "react";
import * as styles from "../Header/Header.module.css";
import { FaSearch } from "react-icons/fa";

export default function Header({ onSearch }) {
  const [selected, setSelected] = useState("Filmes");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      onSearch(query);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        {["Filmes", "Series", "Minha Conta"].map((item) => (
          <h2
            key={item}
            className={`${styles.navItem} ${selected === item ? styles.active : ""}`}
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
