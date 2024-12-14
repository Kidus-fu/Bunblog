import { ACCESS_TOKEN } from "./config";
import axios from "axios"

const endpoint = "http://localhost:8000/"



const api = axios.create({
    baseURL: endpoint
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config
    },
    (error) => Promise.reject(error)
)
export default api;