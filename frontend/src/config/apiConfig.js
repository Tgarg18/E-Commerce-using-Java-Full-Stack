import axios from "axios";
import { toast } from "react-toastify";
import { navigateTo } from "../utils/navigateHelper";

let toastTimeout = null;

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message;
        if (message === "Invalid Token from JWT Validator") {
            if (!toastTimeout) {
                toast.error("Please login.");
                navigateTo("/");
                toastTimeout = setTimeout(() => {
                    toastTimeout = null;
                }, 2000);
                localStorage.removeItem("jwt");
            }
        }
        return Promise.reject(error);
    }
);
