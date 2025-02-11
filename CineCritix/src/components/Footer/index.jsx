import React from "react";
import * as styles from "../Footer/Footer.module.css";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.title}>Desenvolvido por</h3>
      <div className={styles.positionUser}>
        <div className={styles.user}>
          <h3>Davi</h3>
          <div className={styles.icons}>
          <a className={styles.icon}>
            <FaGithub />
          </a>
          <a className={styles.icon}>
            <FaInstagram />
          </a>
          <a className={styles.icon}>
            <FaLinkedin />
          </a>
          </div>
        </div>

        <div className={styles.user}>
          <h3>Patrick</h3>
          <div className={styles.icons}>
          <a className={styles.icon}>
            <FaGithub />
          </a>
          <a className={styles.icon}>
            <FaInstagram />
          </a>
          <a className={styles.icon}>
            <FaLinkedin />
          </a>
          </div>
        </div>

        <div className={styles.user}>
          <h3>Rodrigo</h3>
          <div className={styles.icons}>
          <a className={styles.icon}>
            <FaGithub />
          </a>
          <a className={styles.icon}>
            <FaInstagram />
          </a>
          <a className={styles.icon}>
            <FaLinkedin />
          </a>
          </div>
        </div>
      </div>
      <h3>Contate-nos!</h3>
      <div className={styles.line}>
        ©2024 CineCritix. Todos os direitos reservados
        <a href="">. Termos de Uso</a> | <a href="">Politica de Privacidade</a>
      </div>
    </footer>
  );
}
