import axios from "axios";

const API = "http://localhost:8080";

export const api = axios.create({
  baseURL: API,
});

export const getAllMovies = async () => {
    try {
        const response = await api.get("/series");
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}