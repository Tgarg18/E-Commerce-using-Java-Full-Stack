import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
    },
})