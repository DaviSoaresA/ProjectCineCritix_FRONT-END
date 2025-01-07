import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Demo from "../../assets/demo.jpg";
import ButtonLogin from "../../components/ButtonLogin";
import "../../Global.css";
import * as styles from "../Login/Login.module.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

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
            <div className={styles.line}></div>
            <h2>Ou</h2>
            <div className={styles.line}></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
              <input
                className={styles.textInput}
                placeholder="Email"
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Formato de email inválido",
                  },
                })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <input
                className={styles.textInput}
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                {...register("password", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </span>
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>

            <ButtonLogin name={"Entrar"} type="submit" />
          </form>
          <p>
            Não tem uma conta? <a href="">Registre-se</a>
          </p>
        </div>
      </div>
    </main>
  );
}
