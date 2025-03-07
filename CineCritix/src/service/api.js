import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API = "https://projectcinecritixback-end-production.up.railway.app";

export const api = axios.create({
  baseURL: API,
});

export function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Token decodificado:", decoded);
    return decoded.id;
    
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

export async function getUserById() {
  try {
    const userId = getUserIdFromToken();
    if (!userId) throw new Error("Usuário não autenticado");

    const response = await api.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("Usuário autenticado:", response.data);
    

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error.message);
    throw error;
  }
}

export const getAllMovies = async () => {
  try {
    const response = await api.get("/movies");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getMovieById(id) {
  try {
    const response = await api.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw error;
  }
}

export async function login(data) {
  console.log(data);

  try {
    const response = await api.post(`/login`, data);
    if (response.status === 200) {
      const token = response.headers["authorization"];
      localStorage.setItem("token", token);
      return response;
    }
  } catch (error) {
    console.log("erro na requisicao " + error.message);
  }
}

export async function cadastro(data) {
  try {
    const response = await api.post(`/users`, data);
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log("erro na requisicao " + error.message);
  }
}

export async function getUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Usuário não está autenticado");
    }

    const response = await api.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Erro ao buscar usuário:", error.message);
    throw error;
  }
}
