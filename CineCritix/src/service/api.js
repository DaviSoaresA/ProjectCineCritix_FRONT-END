import axios from "axios";

const API = "http://localhost:8080";

export const api = axios.create({
  baseURL: API,
});

export const getAllMovies = async () => {
    try {
        const response = await api.get("/movies");
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function login (data){
    try {
        const response = await api.post(`/login`, {
            data
        });
        if (response.status === 200) {
            const token = response.headers["authorization"];
            localStorage.setItem("token", token);
            return response;
        }
    } catch (error) {
        console.log("erro na requisicao " + error.message);
    }
}
export async function login (data){
    try {
        const response = await api.post(`/usuarios`, {
            data
        });
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log("erro na requisicao " + error.message);
    }
}