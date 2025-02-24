
import React from "react";
import * as styles from "../Register/Register.module.css";
import { useForm } from "react-hook-form";
import ButtonLogin from "../../components/ButtonLogin";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
          const response = await Register(data);
        if (response.status === 200) {
          setLoading(false);
          setSucess(true);
          setError(false)
          setTimeout(() => {
            navigate
          },4000)
        }
        } catch (error) {
         setError(true); 
        }
      };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cadastre-se</h1>
      <div className={styles.box}>
        <img src="" alt="" />
      </div>
      <div className={styles.box2}></div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.textInput}
          placeholder="Nome Completo"
          {...register("nome", {
            required: "O nome é obrigatória",
          })}
        />
        {errors.nome && <p className={styles.error}>{errors.nome.message}</p>}

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
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input
          className={styles.textInput}
          placeholder="Senha"
          {...register("senha", {
            required: "A senha é obrigatória",
          })}
        />
        {errors.senha && <p className={styles.error}>{errors.senha.message}</p>}

        <input
          className={styles.textInput}
          placeholder="Confirma Senha"
          {...register("confirmaSenha", {
            required: "Confirma Senha é obrigatória",
          })}
        />
        {errors.confirmaSenha && <p className={styles.error}>{errors.confirmaSenha.message}</p>}

        <button className={styles.button} type="submit">
          Cadastrar
        </button>
      </form>
    </main>
  );
}
