import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Demo from "../../assets/demo.jpg";
import "../../Global.css";
import * as styles from "../Login/Login.module.css";
import TextInputLogin from "../../components/textInputLogin/index";
import ButtonLogin from "../../components/ButtonLogin";

export default function Login() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.positionPicture}>
          <img src={Demo} alt="coleção de filmes" className={styles.picture} />
          <div className={styles.box}></div>
        </div>
        <div className={styles.positionForm}>
          <h1>Login</h1>
          <div className={styles.positionIcons}>
            <div className={styles.icon}>
              <FcGoogle size={40} />
            </div>
            <div className={styles.icon}>
              <FaFacebookSquare size={40} color="#1877F2" />
            </div>
          </div>
          <div className={styles.or}>
            <div className={styles.line}></div> <h2>Ou</h2>{" "}
            <div className={styles.line}></div>
          </div>
          <div className={styles.form}>
            <TextInputLogin placeholder="Email" />
            <TextInputLogin placeholder="Senha" />
            <ButtonLogin name={"Entrar"} />
          </div>
          <p>
            Não tem uma conta? <a href="">Registre-se</a>
          </p>
        </div>
      </div>
    </main>
  );
}
